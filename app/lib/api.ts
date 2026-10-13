// Centralized API client for Party Square frontend & admin

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("adminToken");
}

function getAuthHeaders(isFormData = false): HeadersInit {
  const headers: Record<string, string> = {};
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  const token = getAdminToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type");
  let data: any;
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const errorMsg = data?.message || data?.error || (typeof data === "string" ? data : `Request failed with status ${res.status}`);
    throw new Error(errorMsg);
  }

  return data as T;
}

// ==========================================
// CATEGORIES API
// ==========================================

export interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentCategory?: {
    _id: string;
    name: string;
    slug: string;
  } | null;
  isActive: boolean;
  order: number;
  productCount?: number;
  subcategoriesCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedCategories {
  categories: CategoryItem[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export async function fetchCategories(params?: {
  search?: string;
  parentOnly?: boolean;
  parentCategory?: string;
  isActive?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<CategoryItem[] | PaginatedCategories> {
  const query = new URLSearchParams();
  if (params?.search) query.append("search", params.search);
  if (params?.parentOnly) query.append("parentOnly", "true");
  if (params?.parentCategory) query.append("parentCategory", params.parentCategory);
  if (params?.isActive !== undefined) query.append("isActive", String(params.isActive));
  if (params?.sort) query.append("sort", params.sort);
  if (params?.page) query.append("page", String(params.page));
  if (params?.limit) query.append("limit", String(params.limit));

  const url = `${API_BASE}/api/categories${query.toString() ? `?${query.toString()}` : ""}`;
  const res = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });
  return handleResponse(res);
}

export async function fetchSubcategories(parentId: string): Promise<CategoryItem[]> {
  try {
    const res = await fetch(`${API_BASE}/api/categories/${encodeURIComponent(parentId)}/subcategories`, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
    });
    if (!res.ok) {
      return [];
    }
    return handleResponse<CategoryItem[]>(res);
  } catch {
    return [];
  }
}

export async function fetchCategoryById(id: string): Promise<CategoryItem> {
  const res = await fetch(`${API_BASE}/api/categories/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });
  return handleResponse<CategoryItem>(res);
}

export async function createCategory(data: Partial<CategoryItem>): Promise<CategoryItem> {
  const res = await fetch(`${API_BASE}/api/categories`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<CategoryItem>(res);
}

export async function updateCategory(id: string, data: Partial<CategoryItem>): Promise<CategoryItem> {
  const res = await fetch(`${API_BASE}/api/categories/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<CategoryItem>(res);
}

export async function deleteCategory(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/categories/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse<{ message: string }>(res);
}

// ==========================================
// PRODUCTS API
// ==========================================

export interface ProductItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  fullDescription?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
  };
  subcategory?: {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    parentCategory?: string;
  } | null;
  sku?: string;
  stock?: number;
  availability: boolean;
  included?: string[];
  notIncluded?: string[];
  cancellationPolicy?: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  faqs?: Array<{ question: string; answer: string; _id?: string }>;
  theme?: string;
  gradientBg?: string;
  isSpecialCard?: boolean;
  availableCities?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProducts {
  products: ProductItem[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export async function fetchProducts(params?: {
  search?: string;
  category?: string;
  subcategory?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedProducts> {
  const query = new URLSearchParams();
  if (params?.search) query.append("search", params.search);
  if (params?.category) query.append("category", params.category);
  if (params?.subcategory) query.append("subcategory", params.subcategory);
  if (params?.status) query.append("status", params.status);
  if (params?.minPrice !== undefined) query.append("minPrice", String(params.minPrice));
  if (params?.maxPrice !== undefined) query.append("maxPrice", String(params.maxPrice));
  if (params?.city) query.append("city", params.city);
  if (params?.sort) query.append("sort", params.sort);
  
  query.append("page", String(params?.page || 1));
  query.append("limit", String(params?.limit || 12));

  const url = `${API_BASE}/api/products?${query.toString()}`;
  const res = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });
  return handleResponse<PaginatedProducts>(res);
}

export async function fetchProductByIdOrSlug(idOrSlug: string): Promise<ProductItem> {
  const res = await fetch(`${API_BASE}/api/products/${encodeURIComponent(idOrSlug)}`, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });
  return handleResponse<ProductItem>(res);
}

export async function createProduct(data: any): Promise<ProductItem> {
  const res = await fetch(`${API_BASE}/api/products`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<ProductItem>(res);
}

export async function updateProduct(id: string, data: any): Promise<ProductItem> {
  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<ProductItem>(res);
}

export async function deleteProduct(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse<{ message: string }>(res);
}

// ==========================================
// UPLOAD API
// ==========================================

export async function uploadImage(file: File): Promise<{ url: string; public_id: string; message: string }> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/api/upload`, {
    method: "POST",
    headers: getAuthHeaders(true),
    body: formData,
  });
  return handleResponse<{ url: string; public_id: string; message: string }>(res);
}

// ==========================================
// DASHBOARD STATS API
// ==========================================

export interface DashboardMetrics {
  totalUsers: number;
  totalAdmins: number;
  totalSuperAdmins: number;
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  totalMainCategories: number;
  totalSubcategories: number;
  totalCategories: number;
  lowStockProducts: number;
}

export interface DashboardOverview {
  metrics: DashboardMetrics;
  categoryBreakdown: Array<{ name: string; value: number; color: string }>;
  structure: {
    topbarConfigured: boolean;
    sidebarConfigured: boolean;
    homeSectionsConfigured: boolean;
  };
}

export async function fetchDashboardOverview(): Promise<DashboardOverview> {
  const res = await fetch(`${API_BASE}/api/super-admin/dashboard`, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });
  return handleResponse<DashboardOverview>(res);
}

// ==========================================
// BOOKING LEADS API
// ==========================================

export interface LeadBookingPayload {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  productName: string;
  productId?: string;
  productImage?: string;
  city?: string;
  eventDate: string;
  eventTimeSlot?: string;
  specialRequests?: string;
  totalAmount?: number;
}

export async function createBookingLead(payload: LeadBookingPayload): Promise<any> {
  const res = await fetch(`${API_BASE}/api/bookings/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

