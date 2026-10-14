// Centralized API client for Party Square frontend & admin

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;

  const sanitize = (val: string | null | undefined): string | null => {
    if (!val) return null;
    const trimmed = String(val).trim();
    if (!trimmed || trimmed === "undefined" || trimmed === "null" || trimmed === "[object Object]") return null;
    return trimmed;
  };

  // Check if admin session has expired (e.g. 4 hours timeout)
  const expiresAt = localStorage.getItem("adminExpiresAt");
  if (expiresAt && Date.now() > Number(expiresAt)) {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminExpiresAt");
    document.cookie = "adminToken=; path=/; max-age=0";
    return null;
  }

  const localAdmin = sanitize(localStorage.getItem("adminToken"));
  if (localAdmin) return localAdmin;

  const cookieAdmin = document.cookie
    .split("; ")
    .find((row) => row.startsWith("adminToken="))
    ?.split("=")[1];
  const sanitizedCookieAdmin = sanitize(cookieAdmin ? decodeURIComponent(cookieAdmin) : null);
  if (sanitizedCookieAdmin) return sanitizedCookieAdmin;

  // Strict: Never fall back to customer user token for admin operations
  return null;
}

function getAuthHeaders(isFormData = false): HeadersInit {
  const headers: Record<string, string> = {};
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  const token = getAdminToken();
  if (token && token.length > 10) {
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

export async function uploadMedia(file: File): Promise<{ url: string; public_id: string; message: string }> {
  const formData = new FormData();
  formData.append("file", file);

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

export async function fetchDashboardOverview(): Promise<DashboardOverview | null> {
  const token = getAdminToken();
  if (!token) return null;

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

export interface CreateBookingPayload {
  productName: string;
  productId?: string;
  productImage?: string;
  city?: string;
  eventDate: string;
  eventTimeSlot?: string;
  deliveryAddress?: string;
  specialRequests?: string;
  totalAmount: number;
  advanceAmountPaid?: number;
  onSiteAmountPending?: number;
  paymentMethod?: string;
  customerPhone?: string;
  customerName?: string;
  customerEmail?: string;
}

export async function createBooking(payload: CreateBookingPayload): Promise<{
  success: boolean;
  booking: any;
  token?: string;
  user?: any;
}> {
  const token = typeof window !== "undefined" ? (localStorage.getItem("token") || getAdminToken()) : null;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}/api/bookings`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function fetchMyBookings(): Promise<any[]> {
  const token = typeof window !== "undefined" ? (localStorage.getItem("token") || getAdminToken()) : null;
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}/api/bookings/my`, {
    method: "GET",
    headers,
    cache: "no-store",
  });
  return handleResponse(res);
}

export async function fetchBookingsByPhone(phone: string): Promise<any[]> {
  const res = await fetch(`${API_BASE}/api/bookings/by-phone/${encodeURIComponent(phone)}`, {
    method: "GET",
    cache: "no-store",
  });
  return handleResponse(res);
}

export async function fetchAllBookings(): Promise<any[]> {
  const res = await fetch(`${API_BASE}/api/bookings`, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });
  return handleResponse(res);
}

export async function updateBookingStatus(id: string, bookingStatus: string): Promise<any> {
  const res = await fetch(`${API_BASE}/api/bookings/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ bookingStatus }),
  });
  return handleResponse(res);
}

export async function deleteBooking(id: string): Promise<any> {
  const res = await fetch(`${API_BASE}/api/bookings/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
}

// ==========================================
// CITIES API
// ==========================================

export interface CityFaq {
  question: string;
  answer: string;
  _id?: string;
}

export interface CityItem {
  _id: string;
  name: string;
  slug?: string;
  state?: string;
  icon?: string;
  isActive: boolean;
  isPopular: boolean;
  order: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  heading?: string;
  subheading?: string;
  content?: string;
  serviceAreas?: string[];
  faqs?: CityFaq[];
  createdAt?: string;
  updatedAt?: string;
}

export async function fetchCities(all = false): Promise<CityItem[]> {
  const query = all ? "?all=true" : "";
  const res = await fetch(`${API_BASE}/api/cities${query}`, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });
  return handleResponse<CityItem[]>(res);
}

export async function fetchCityBySlugOrId(idOrSlug: string): Promise<CityItem | null> {
  try {
    const res = await fetch(`${API_BASE}/api/cities/${encodeURIComponent(idOrSlug)}`, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) return null;
    return handleResponse<CityItem>(res);
  } catch {
    return null;
  }
}

export async function createCity(data: Partial<CityItem>): Promise<CityItem> {
  const res = await fetch(`${API_BASE}/api/cities`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<CityItem>(res);
}

export async function updateCity(id: string, data: Partial<CityItem>): Promise<CityItem> {
  const res = await fetch(`${API_BASE}/api/cities/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<CityItem>(res);
}

export async function deleteCity(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/cities/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse<{ message: string }>(res);
}

// ==========================================
// CUSTOMERS / USERS API
// ==========================================

export interface CustomerUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  authProvider?: string;
  isProfileComplete?: boolean;
  createdAt: string;
  bookingsCount: number;
  latestBooking?: {
    bookingId: string;
    productName: string;
    eventDate: string;
    totalAmount: number;
    advanceAmountPaid: number;
    paymentStatus: string;
    bookingStatus: string;
    createdAt: string;
  } | null;
}

export async function fetchCustomers(): Promise<CustomerUser[]> {
  const res = await fetch(`${API_BASE}/api/super-admin/users`, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });
  return handleResponse<CustomerUser[]>(res);
}

export interface PricingPackage {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
  pageTarget: string;
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export async function fetchPackages(pageTarget?: string): Promise<PricingPackage[]> {
  const url = pageTarget
    ? `${API_BASE}/api/packages?pageTarget=${encodeURIComponent(pageTarget)}`
    : `${API_BASE}/api/packages`;
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  return handleResponse<PricingPackage[]>(res);
}

export async function createPackage(data: Partial<PricingPackage>): Promise<PricingPackage> {
  const res = await fetch(`${API_BASE}/api/packages`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<PricingPackage>(res);
}

export async function updatePackage(id: string, data: Partial<PricingPackage>): Promise<PricingPackage> {
  const res = await fetch(`${API_BASE}/api/packages/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<PricingPackage>(res);
}

export async function deletePackage(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/packages/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse<{ message: string }>(res);
}

// ==========================================
// GALLERY SHOWCASE API
// ==========================================

export interface GalleryItem {
  _id: string;
  title: string;
  image: string;
  pageTarget: string;
  category?: string;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export async function fetchGalleryItems(pageTarget?: string): Promise<GalleryItem[]> {
  const url = pageTarget
    ? `${API_BASE}/api/gallery?pageTarget=${encodeURIComponent(pageTarget)}`
    : `${API_BASE}/api/gallery`;
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  return handleResponse<GalleryItem[]>(res);
}

export async function fetchAdminGalleryItems(pageTarget?: string): Promise<GalleryItem[]> {
  const url = pageTarget
    ? `${API_BASE}/api/gallery/admin?pageTarget=${encodeURIComponent(pageTarget)}`
    : `${API_BASE}/api/gallery/admin`;
  const res = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });
  return handleResponse<GalleryItem[]>(res);
}

export async function createGalleryItem(data: Partial<GalleryItem>): Promise<GalleryItem> {
  const res = await fetch(`${API_BASE}/api/gallery`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<GalleryItem>(res);
}

export async function updateGalleryItem(id: string, data: Partial<GalleryItem>): Promise<GalleryItem> {
  const res = await fetch(`${API_BASE}/api/gallery/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<GalleryItem>(res);
}

export async function deleteGalleryItem(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/api/gallery/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse<{ message: string }>(res);
}

// ==========================================
// HOMEPAGE SECTIONS API
// ==========================================

export interface HomePageSection<T = any> {
  _id?: string;
  sectionKey: string;
  title: string;
  subtitle?: string;
  order: number;
  isEnabled: boolean;
  contentData: T;
  createdAt?: string;
  updatedAt?: string;
}

export async function fetchHomePageSections(): Promise<HomePageSection[]> {
  const res = await fetch(`${API_BASE}/api/homepage`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  const data = await handleResponse<any>(res);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.sections)) return data.sections;
  return [];
}

export async function fetchHomePageSection<T = any>(sectionKey: string): Promise<HomePageSection<T>> {
  const res = await fetch(`${API_BASE}/api/homepage/sections/${encodeURIComponent(sectionKey)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  return handleResponse<HomePageSection<T>>(res);
}

export async function updateHomePageSection<T = any>(
  sectionKey: string,
  payload: Partial<HomePageSection<T>>
): Promise<HomePageSection<T>> {
  const res = await fetch(`${API_BASE}/api/homepage/sections/${encodeURIComponent(sectionKey)}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse<HomePageSection<T>>(res);
}

// ==========================================
// ANALYTICS & REPORTS API
// ==========================================

export interface AnalyticsMetrics {
  totalBookings: number;
  successfulEvents: number;
  completedCount: number;
  confirmedCount: number;
  inProgressCount: number;
  pendingCount: number;
  cancelledCount: number;
  totalRevenue: number;
  advanceCollected: number;
  pendingOnSite: number;
  averageBookingValue: number;
  completionRate: string;
  growthRate: string;
  clientSatisfaction: string;
  totalReviews: number;
}

export interface AnalyticsTheme {
  name: string;
  bookings: number;
  revenue: number;
  advance: number;
  city?: string;
  image?: string;
}

export interface AnalyticsCity {
  city: string;
  bookings: number;
  revenue: number;
}

export interface AnalyticsPayment {
  method: string;
  count: number;
}

export interface AnalyticsRecentBooking {
  bookingId: string;
  customerName: string;
  customerPhone?: string;
  productName: string;
  city?: string;
  totalAmount: number;
  advanceAmountPaid: number;
  bookingStatus: string;
  paymentStatus: string;
  eventDate: string;
  createdAt?: string;
}

export interface AnalyticsReport {
  metrics: AnalyticsMetrics;
  topThemes: AnalyticsTheme[];
  cityBreakdown: AnalyticsCity[];
  paymentBreakdown: AnalyticsPayment[];
  recentBookings: AnalyticsRecentBooking[];
}

export async function fetchAnalyticsReport(): Promise<AnalyticsReport> {
  const res = await fetch(`${API_BASE}/api/super-admin/analytics`, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });
  return handleResponse<AnalyticsReport>(res);
}




