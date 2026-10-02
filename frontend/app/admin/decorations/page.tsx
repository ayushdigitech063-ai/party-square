"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Upload, 
  MessageCircle, 
  Save, 
  CheckCircle2, 
  Loader2, 
  Layers, 
  CircleDot, 
  Columns, 
  Star,
  Briefcase,
  Image as ImageIcon
} from "lucide-react";
import { API_URL } from "@/config";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

interface ThemeItem {
  id: string;
  name: string;
  category: string;
  image: string;
  price?: number | string;
  description: string;
  tag?: string;
}

interface PackageItem {
  _id?: string;
  name: string;
  description: string;
  price: number | string;
  image: string;
  pageTarget: string; // 'ring-decoration' | 'wall-decoration' | other
  isPopular?: boolean;
  features?: string[];
}

const DEFAULT_THEMES: ThemeItem[] = [
  {
    id: "th-1",
    name: "Radiant Diwali Decor",
    category: "Diwali Festive",
    image: "/diwali.png",
    price: "₹14,999",
    description: "Traditional diyas, grand floral rangolis, golden lighting, and warm festive backdrops for homes and commercial offices.",
    tag: "Diwali Festive"
  },
  {
    id: "th-2",
    name: "Bespoke Home Makeovers",
    category: "Home Styling",
    image: "/homedecoration.png",
    price: "₹8,999",
    description: "Elevating living spaces with aesthetic floral arrangements, ambient lighting, and elegant corners tailored for housewarmings.",
    tag: "Home Styling"
  },
  {
    id: "th-3",
    name: "Winter Wonderland Christmas",
    category: "Christmas Joy",
    image: "/crismasdecoration1.png",
    price: "₹12,499",
    description: "Custom decorated Christmas trees, snowy themes, fairy lights, and cozy festive corners that capture holiday magic.",
    tag: "Christmas Joy"
  },
  {
    id: "th-4",
    name: "Glamorous New Year Parties",
    category: "New Year Bash",
    image: "/newyearparty.png",
    price: "₹15,999",
    description: "Glittering metallic backdrops, balloon installations, champagne-themed setups, and high-energy party environments.",
    tag: "New Year Bash"
  },
  {
    id: "th-5",
    name: "Patriotic & National Events",
    category: "National Pride",
    image: "/indepencedaydecoration.png",
    price: "₹9,999",
    description: "Tricolor floral installations, themed backdrops, and respectful patriotic setups for institutions, schools, and corporate offices.",
    tag: "National Pride"
  },
  {
    id: "th-6",
    name: "Welcome Baby & Cradle Ceremonies",
    category: "New Arrival",
    image: "/welcomebabaydecoration.png",
    price: "₹7,999",
    description: "Soft pastel balloon arches, teddy-themed props, and delicate floral settings to welcome your newborn home with warmth and love.",
    tag: "New Arrival"
  }
];

export default function AdminDecorations() {
  const { admin } = useAuth();
  const [activeTab, setActiveTab] = useState<"general" | "ring" | "wall" | "corporate" | "wall-gallery">("general");

  // General Themes
  const [themes, setThemes] = useState<ThemeItem[]>(DEFAULT_THEMES);
  const [whatsappNumber, setWhatsappNumber] = useState("8010679679");
  const [loading, setLoading] = useState(true);
  const [savingThemes, setSavingThemes] = useState(false);
  const [savingWp, setSavingWp] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Wall & Door Showcase Gallery Photos
  const [wallGallery, setWallGallery] = useState<string[]>([
    "/walldecoration.png",
    "/walldecoration1.png",
    "/doordecoration.png",
    "/doordecoration1.png"
  ]);
  const [savingWallGallery, setSavingWallGallery] = useState(false);
  const [showWallGalleryModal, setShowWallGalleryModal] = useState(false);
  const [newWallGalleryImg, setNewWallGalleryImg] = useState("");

  // Packages (Ring & Wall)
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [showPkgModal, setShowPkgModal] = useState(false);
  const [savingPkg, setSavingPkg] = useState(false);
  const [newPkg, setNewPkg] = useState<{
    name: string;
    description: string;
    price: string;
    image: string;
    pageTarget: string;
    isPopular: boolean;
    featuresText: string;
  }>({
    name: "",
    description: "",
    price: "",
    image: "",
    pageTarget: "ring-decoration",
    isPopular: false,
    featuresText: ""
  });

  // Add Theme Modal
  const [showModal, setShowModal] = useState(false);
  const [newTheme, setNewTheme] = useState({
    name: "",
    category: "Festive & Party",
    image: "",
    price: "",
    description: "",
    tag: ""
  });

  // Fetch current Themes, Packages & WhatsApp settings
  const loadData = async () => {
    try {
      setLoading(true);

      // 1. Fetch settings for WhatsApp Number
      const settingsRes = await fetch(`${API_URL}/api/settings`);
      if (settingsRes.ok) {
        const sData = await settingsRes.json();
        if (sData?.whatsappNumber) {
          setWhatsappNumber(sData.whatsappNumber.replace(/\D/g, "").slice(-10));
        }
      }

      // 2. Fetch Themes from Homepage section 'theme_decorations'
      const homeRes = await fetch(`${API_URL}/api/homepage`);
      if (homeRes.ok) {
        const hData = await homeRes.json();
        const themeSection = hData.sections?.find((s: any) => s.sectionKey === 'theme_decorations');
        if (themeSection?.contentData?.themes && Array.isArray(themeSection.contentData.themes) && themeSection.contentData.themes.length > 0) {
          setThemes(themeSection.contentData.themes);
        }

        const wallGalSection = hData.sections?.find((s: any) => s.sectionKey === 'wall_gallery');
        if (wallGalSection?.contentData?.images && Array.isArray(wallGalSection.contentData.images) && wallGalSection.contentData.images.length > 0) {
          setWallGallery(wallGalSection.contentData.images);
        }
      }

      // 3. Fetch Packages for ring, wall & corporate
      const pkgRes = await fetch(`${API_URL}/api/packages`);
      if (pkgRes.ok) {
        const pkgData = await pkgRes.json();
        setPackages(pkgData);
      }
    } catch (err) {
      console.error("Error loading theme decorations data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Save WhatsApp Number
  const handleSaveWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappNumber.trim()) {
      toast.error("Please enter a valid WhatsApp Number");
      return;
    }

    try {
      setSavingWp(true);
      const token = admin?.token || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}")?.token : "");

      const res = await fetch(`${API_URL}/api/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          whatsappNumber: whatsappNumber.trim()
        })
      });

      if (res.ok) {
        toast.success("WhatsApp Number updated across website!");
        if (typeof window !== "undefined") {
          localStorage.setItem("party_whatsapp_number", whatsappNumber.trim());
        }
      } else {
        toast.error("Failed to update WhatsApp number");
      }
    } catch {
      toast.error("Network error while saving WhatsApp number");
    } finally {
      setSavingWp(false);
    }
  };

  // Save Themes array to backend
  const saveThemesToBackend = async (updatedList: ThemeItem[]) => {
    try {
      setSavingThemes(true);
      const token = admin?.token || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}")?.token : "");

      const res = await fetch(`${API_URL}/api/homepage/sections/theme_decorations`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: "Theme Decorations",
          subtitle: "Live Theme Decoration solutions",
          contentData: {
            themes: updatedList
          }
        })
      });

      if (res.ok) {
        setThemes(updatedList);
        toast.success("Theme Decorations updated on website!");
        return true;
      } else {
        toast.error("Failed to sync themes with website");
        return false;
      }
    } catch {
      toast.error("Error saving theme decorations");
      return false;
    } finally {
      setSavingThemes(false);
    }
  };

  // Save Wall & Door Gallery Photos to backend
  const saveWallGalleryToBackend = async (imagesList: string[]) => {
    try {
      setSavingWallGallery(true);
      const token = admin?.token || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}")?.token : "");

      const res = await fetch(`${API_URL}/api/homepage/sections/wall_gallery`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: "Wall & Door Decoration Gallery",
          subtitle: "Visual Showcase",
          contentData: {
            images: imagesList
          }
        })
      });

      if (res.ok) {
        setWallGallery(imagesList);
        toast.success("Wall & Door Gallery updated on website!");
        return true;
      } else {
        toast.error("Failed to sync wall gallery");
        return false;
      }
    } catch {
      toast.error("Error saving wall gallery");
      return false;
    } finally {
      setSavingWallGallery(false);
    }
  };

  // Upload Photo to Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "theme" | "package" | "wallGallery") => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const token = admin?.token || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}")?.token : "");

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        if (target === "theme") {
          setNewTheme(prev => ({ ...prev, image: data.url }));
        } else if (target === "package") {
          setNewPkg(prev => ({ ...prev, image: data.url }));
        } else {
          setNewWallGalleryImg(data.url);
        }
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Upload failed");
      }
    } catch {
      toast.error("Image upload network error");
    } finally {
      setUploadingImage(false);
    }
  };

  // Add Theme Submit
  const handleAddThemeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTheme.name.trim()) {
      toast.error("Please enter Theme Name");
      return;
    }
    if (!newTheme.image.trim()) {
      toast.error("Please upload or provide an Image");
      return;
    }

    const item: ThemeItem = {
      id: `theme-${Date.now()}`,
      name: newTheme.name.trim(),
      category: newTheme.category,
      image: newTheme.image.trim(),
      price: newTheme.price.trim() ? (newTheme.price.startsWith("₹") ? newTheme.price : `₹${newTheme.price}`) : "Custom Quote",
      description: newTheme.description.trim() || "Exclusive bespoke decoration setup designed with premium materials.",
      tag: newTheme.tag.trim() || newTheme.category
    };

    const updated = [item, ...themes];
    const success = await saveThemesToBackend(updated);
    if (success) {
      setShowModal(false);
      setNewTheme({
        name: "",
        category: "Festive & Party",
        image: "",
        price: "",
        description: "",
        tag: ""
      });
    }
  };

  // Delete Theme
  const handleDeleteTheme = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Theme?",
      text: "This theme will be removed from Theme Decoration page.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      const updated = themes.filter(t => t.id !== id);
      await saveThemesToBackend(updated);
    }
  };

  // Add Package Submit (Ring or Wall)
  const handleAddPackageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkg.name.trim()) {
      toast.error("Please enter Package Name");
      return;
    }
    if (!newPkg.image.trim()) {
      toast.error("Please upload or provide an image");
      return;
    }
    if (!newPkg.price) {
      toast.error("Please enter a valid price");
      return;
    }

    try {
      setSavingPkg(true);
      const token = admin?.token || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}")?.token : "");

      const features = newPkg.featuresText
        ? newPkg.featuresText.split("\n").map(f => f.trim()).filter(Boolean)
        : [];

      const payload = {
        name: newPkg.name.trim(),
        description: newPkg.description.trim(),
        price: Number(newPkg.price.replace(/\D/g, "")),
        image: newPkg.image.trim(),
        pageTarget: newPkg.pageTarget,
        isPopular: newPkg.isPopular,
        features: features.length > 0 ? features : ["Professional setup included", "Clean & damage-free execution"]
      };

      const res = await fetch(`${API_URL}/api/packages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const created = await res.json();
        const targetLabel = 
          newPkg.pageTarget === "ring-decoration" 
            ? "Ring Decoration" 
            : newPkg.pageTarget === "corporate-planner"
            ? "Corporate Planner"
            : "Wall Decoration";
        toast.success(`Package added to ${targetLabel}!`);
        setShowPkgModal(false);
        setNewPkg({
          name: "",
          description: "",
          price: "",
          image: "",
          pageTarget: activeTab === "wall" ? "wall-decoration" : activeTab === "corporate" ? "corporate-planner" : "ring-decoration",
          isPopular: false,
          featuresText: ""
        });
      } else {
        toast.error("Failed to save package");
      }
    } catch {
      toast.error("Error creating package");
    } finally {
      setSavingPkg(false);
    }
  };

  // Delete Package
  const handleDeletePackage = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: `Delete "${name}"?`,
      text: "This package will be permanently removed from the website.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) return;

    try {
      const token = admin?.token || (typeof window !== "undefined" ? JSON.parse(localStorage.getItem("adminUser") || "{}")?.token : "");
      const res = await fetch(`${API_URL}/api/packages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        setPackages(prev => prev.filter(p => p._id !== id));
        toast.success("Package deleted successfully");
      } else {
        toast.error("Failed to delete package");
      }
    } catch {
      toast.error("Error deleting package");
    }
  };

  const ringPackages = packages.filter(p => p.pageTarget === "ring-decoration");
  const wallPackages = packages.filter(p => p.pageTarget === "wall-decoration");
  const corporatePackages = packages.filter(p => p.pageTarget === "corporate-planner");

  return (
    <div className="space-y-6 w-full font-sans">
      
      {/* 1. WHATSAPP CONFIGURATION BAR (Universal) */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white p-6 sm:p-7 rounded-3xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <MessageCircle size={14} />
            <span>Universal WhatsApp Booking Number</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold">
            Customer WhatsApp Inquiries Number
          </h2>
          <p className="text-emerald-100 text-xs font-light max-w-xl">
            Ring Decoration, Wall Decoration aur Theme Decoration pages ke direct "Book on WhatsApp" buttons isi number par pre-filled package message bhejenge.
          </p>
        </div>

        <form onSubmit={handleSaveWhatsApp} className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
          <div className="relative w-full sm:w-60">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400">
              +91
            </span>
            <input 
              type="text"
              required
              maxLength={10}
              placeholder="e.g. 8010679679"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ""))}
              className="w-full bg-white text-neutral-900 pl-12 pr-4 py-2.5 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={savingWp}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-6 py-2.5 rounded-2xl text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            {savingWp ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            <span>Save Number</span>
          </button>
        </form>
      </div>

      {/* 2. TABS: THEME DECORATIONS, RING DECORATION, WALL DECORATION */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-2xl border border-amber-200/80 shadow-sm">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
            activeTab === "general"
              ? "bg-amber-500 text-neutral-950 shadow-sm"
              : "text-neutral-600 hover:bg-amber-50"
          }`}
        >
          <Sparkles size={15} />
          <span>General Themes ({themes.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("ring");
            setNewPkg(prev => ({ ...prev, pageTarget: "ring-decoration" }));
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
            activeTab === "ring"
              ? "bg-[#C5A059] text-white shadow-sm"
              : "text-neutral-600 hover:bg-[#FAF8F5]"
          }`}
        >
          <CircleDot size={15} />
          <span>Ring Decoration Packages ({ringPackages.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("wall");
            setNewPkg(prev => ({ ...prev, pageTarget: "wall-decoration" }));
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
            activeTab === "wall"
              ? "bg-rose-600 text-white shadow-sm"
              : "text-neutral-600 hover:bg-rose-50"
          }`}
        >
          <Columns size={15} />
          <span>Wall & Door Packages ({wallPackages.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("corporate");
            setNewPkg(prev => ({ ...prev, pageTarget: "corporate-planner" }));
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
            activeTab === "corporate"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-neutral-600 hover:bg-indigo-50"
          }`}
        >
          <Briefcase size={15} />
          <span>Corporate Packages ({corporatePackages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("wall-gallery")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
            activeTab === "wall-gallery"
              ? "bg-amber-600 text-white shadow-sm"
              : "text-neutral-600 hover:bg-amber-50"
          }`}
        >
          <ImageIcon size={15} />
          <span>Wall Gallery Showcase ({wallGallery.length})</span>
        </button>
      </div>

      {/* ================= TAB 1: GENERAL THEME DECORATIONS ================= */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-amber-200/80 p-6 rounded-3xl shadow-sm">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif text-2xl font-bold text-neutral-900">General Theme Decorations</h2>
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Live on /services
                </span>
              </div>
              <p className="text-neutral-500 text-xs font-light mt-1">
                Yahan se naye festive themes add karein ya existing themes ko delete karein.
              </p>
            </div>

            <button 
              onClick={() => setShowModal(true)}
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md transition cursor-pointer shrink-0"
            >
              <Plus size={16} />
              <span>Add New Theme</span>
            </button>
          </div>

          {loading ? (
            <div className="bg-white border border-amber-200/80 rounded-3xl p-12 text-center text-neutral-500 text-sm flex items-center justify-center space-x-2">
              <Loader2 size={18} className="animate-spin text-amber-500" />
              <span>Loading themes catalogue...</span>
            </div>
          ) : themes.length === 0 ? (
            <div className="bg-white border border-amber-200/80 rounded-3xl p-12 text-center space-y-3">
              <Sparkles size={36} className="text-neutral-300 mx-auto" />
              <h4 className="font-bold text-neutral-800 text-sm">No Themes Added Yet</h4>
              <p className="text-xs text-neutral-500">Click "Add New Theme" to publish themes.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.map((theme) => (
                <div 
                  key={theme.id} 
                  className="bg-white border border-amber-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
                      <img 
                        src={theme.image} 
                        alt={theme.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20">
                        {theme.tag || theme.category}
                      </div>

                      <button 
                        onClick={() => handleDeleteTheme(theme.id)}
                        disabled={savingThemes}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-red-600 flex items-center justify-center shadow-md hover:scale-110 transition cursor-pointer"
                        title="Delete Theme"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="p-6 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                          {theme.category}
                        </span>
                        {theme.price && (
                          <span className="text-sm font-bold text-neutral-900 font-mono">
                            {theme.price}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-lg font-bold text-neutral-900 group-hover:text-amber-800 transition line-clamp-1">
                        {theme.name}
                      </h3>

                      <p className="text-neutral-500 text-xs font-light leading-relaxed line-clamp-2">
                        {theme.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#FAF7F2] border-t border-amber-100 flex items-center justify-between text-xs text-neutral-600">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <CheckCircle2 size={13} /> Active on /services
                    </span>
                    <span className="text-neutral-400 text-[10px]">
                      WhatsApp Ready
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: RING DECORATION PACKAGES ================= */}
      {activeTab === "ring" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#E8DFD1] p-6 rounded-3xl shadow-sm">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif text-2xl font-bold text-neutral-900">Ring Ceremony Packages</h2>
                <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
                  Live on /services/ring-decoration
                </span>
              </div>
              <p className="text-neutral-500 text-xs font-light mt-1">
                Yahan se Ring Ceremony page ke direct packages add ya delete karein. Har package par "Book on WhatsApp" ka button live rehta hai.
              </p>
            </div>

            <button 
              onClick={() => {
                setNewPkg({
                  name: "",
                  description: "",
                  price: "",
                  image: "",
                  pageTarget: "ring-decoration",
                  isPopular: false,
                  featuresText: "Circular Floral Arch\nFresh Roses & Orchids\nWarm Fairy Lights\n2-3 Hours Setup"
                });
                setShowPkgModal(true);
              }}
              className="bg-[#C5A059] hover:bg-[#b08d4b] text-white px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md transition cursor-pointer shrink-0"
            >
              <Plus size={16} />
              <span>Add Ring Package</span>
            </button>
          </div>

          {loading ? (
            <div className="bg-white border border-[#E8DFD1] rounded-3xl p-12 text-center text-neutral-500 text-sm flex items-center justify-center space-x-2">
              <Loader2 size={18} className="animate-spin text-[#C5A059]" />
              <span>Loading ring packages...</span>
            </div>
          ) : ringPackages.length === 0 ? (
            <div className="bg-white border border-[#E8DFD1] rounded-3xl p-12 text-center space-y-3">
              <CircleDot size={36} className="text-neutral-300 mx-auto" />
              <h4 className="font-bold text-neutral-800 text-sm">No Ring Packages Found</h4>
              <p className="text-xs text-neutral-500">Click "Add Ring Package" to add one.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ringPackages.map((pkg) => (
                <div 
                  key={pkg._id} 
                  className="bg-white border border-[#E8DFD1] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 bg-neutral-100 overflow-hidden">
                      <img 
                        src={pkg.image} 
                        alt={pkg.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md text-[#DFBC71] text-xs font-bold px-3 py-1 rounded-full border border-[#C5A059]/40">
                        ₹{Number(pkg.price).toLocaleString("en-IN")}
                      </div>

                      {pkg.isPopular && (
                        <div className="absolute bottom-3 left-3 bg-[#C5A059] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          Popular
                        </div>
                      )}

                      <button 
                        onClick={() => handleDeletePackage(pkg._id!, pkg.name)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-red-600 flex items-center justify-center shadow-md hover:scale-110 transition cursor-pointer"
                        title="Delete Package"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="font-serif text-base font-bold text-neutral-900 line-clamp-1">
                        {pkg.name}
                      </h3>
                      <p className="text-neutral-500 text-xs font-light leading-relaxed line-clamp-2">
                        {pkg.description}
                      </p>

                      {pkg.features && pkg.features.length > 0 && (
                        <div className="pt-2 border-t border-neutral-100 space-y-1">
                          {pkg.features.slice(0, 3).map((feat, i) => (
                            <div key={i} className="text-[11px] text-neutral-600 flex items-center gap-1.5 line-clamp-1">
                              <CheckCircle2 size={12} className="text-[#C5A059] shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#FAF8F5] border-t border-[#E8DFD1] flex items-center justify-between text-xs text-neutral-600">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                      <CheckCircle2 size={13} /> Active on Ring Page
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 3: WALL DECORATION PACKAGES ================= */}
      {activeTab === "wall" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#E8DFD1] p-6 rounded-3xl shadow-sm">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif text-2xl font-bold text-neutral-900">Wall & Door Packages</h2>
                <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-rose-300">
                  Live on /services/wall-decoration
                </span>
              </div>
              <p className="text-neutral-500 text-xs font-light mt-1">
                Yahan se Wall Decoration page ke direct packages add ya delete karein with WhatsApp booking.
              </p>
            </div>

            <button 
              onClick={() => {
                setNewPkg({
                  name: "",
                  description: "",
                  price: "",
                  image: "",
                  pageTarget: "wall-decoration",
                  isPopular: false,
                  featuresText: "Half/Full Wall Balloon Arch\nMatching Foil Curtains & Banners\nEasy peel-off safe wall hooks\nProfessional installation team"
                });
                setShowPkgModal(true);
              }}
              className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md transition cursor-pointer shrink-0"
            >
              <Plus size={16} />
              <span>Add Wall Package</span>
            </button>
          </div>

          {loading ? (
            <div className="bg-white border border-[#E8DFD1] rounded-3xl p-12 text-center text-neutral-500 text-sm flex items-center justify-center space-x-2">
              <Loader2 size={18} className="animate-spin text-rose-600" />
              <span>Loading wall packages...</span>
            </div>
          ) : wallPackages.length === 0 ? (
            <div className="bg-white border border-[#E8DFD1] rounded-3xl p-12 text-center space-y-3">
              <Columns size={36} className="text-neutral-300 mx-auto" />
              <h4 className="font-bold text-neutral-800 text-sm">No Wall Packages Found</h4>
              <p className="text-xs text-neutral-500">Click "Add Wall Package" to add one.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wallPackages.map((pkg) => (
                <div 
                  key={pkg._id} 
                  className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group border ${
                    pkg.isPopular ? "border-[#C5A059] ring-2 ring-[#C5A059]/30" : "border-[#E8DFD1]"
                  }`}
                >
                  <div>
                    <div className="relative h-52 bg-neutral-100 overflow-hidden">
                      <img 
                        src={pkg.image} 
                        alt={pkg.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md text-[#DFBC71] text-xs font-bold px-3 py-1 rounded-full border border-[#C5A059]/40">
                        ₹{Number(pkg.price).toLocaleString("en-IN")}
                      </div>

                      {pkg.isPopular && (
                        <div className="absolute top-3 right-12 bg-[#C5A059] text-neutral-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                          Most Popular
                        </div>
                      )}

                      <button 
                        onClick={() => handleDeletePackage(pkg._id!, pkg.name)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-red-600 flex items-center justify-center shadow-md hover:scale-110 transition cursor-pointer"
                        title="Delete Package"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="p-6 space-y-2.5">
                      <h3 className="font-serif text-lg font-bold text-neutral-900 line-clamp-1">
                        {pkg.name}
                      </h3>
                      <p className="text-neutral-500 text-xs font-light leading-relaxed line-clamp-2">
                        {pkg.description}
                      </p>

                      {pkg.features && pkg.features.length > 0 && (
                        <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                          {pkg.features.slice(0, 4).map((feat, i) => (
                            <div key={i} className="text-xs text-neutral-600 flex items-center gap-2 line-clamp-1">
                              <CheckCircle2 size={13} className="text-[#C5A059] shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] border-t border-[#E8DFD1] flex items-center justify-between text-xs text-neutral-600">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <CheckCircle2 size={13} /> Active on Wall Page
                    </span>
                    <span className="text-neutral-400 text-[10px]">
                      WhatsApp Ready
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 4: CORPORATE PLANNER PACKAGES ================= */}
      {activeTab === "corporate" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#E8DFD1] p-6 rounded-3xl shadow-sm">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif text-2xl font-bold text-neutral-900">Corporate Planner Packages</h2>
                <span className="bg-indigo-100 text-indigo-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-300">
                  Live on /about (Corporate Section)
                </span>
              </div>
              <p className="text-neutral-500 text-xs font-light mt-1">
                Yahan se Corporate Planner & Office Event packages add ya delete karein with instant WhatsApp inquiry.
              </p>
            </div>

            <button 
              onClick={() => {
                setNewPkg({
                  name: "",
                  description: "",
                  price: "",
                  image: "",
                  pageTarget: "corporate-planner",
                  isPopular: false,
                  featuresText: "Stage & LED Backdrop Setup\nBranded Welcome Arch & Registration Desk\nHigh-Quality PA Audio & Ambient Lights\nDedicated Event Coordinator On-Site"
                });
                setShowPkgModal(true);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md transition cursor-pointer shrink-0"
            >
              <Plus size={16} />
              <span>Add Corporate Package</span>
            </button>
          </div>

          {loading ? (
            <div className="bg-white border border-[#E8DFD1] rounded-3xl p-12 text-center text-neutral-500 text-sm flex items-center justify-center space-x-2">
              <Loader2 size={18} className="animate-spin text-indigo-600" />
              <span>Loading corporate packages...</span>
            </div>
          ) : corporatePackages.length === 0 ? (
            <div className="bg-white border border-[#E8DFD1] rounded-3xl p-12 text-center space-y-3">
              <Briefcase size={36} className="text-neutral-300 mx-auto" />
              <h4 className="font-bold text-neutral-800 text-sm">No Corporate Packages Found</h4>
              <p className="text-xs text-neutral-500">Click "Add Corporate Package" to publish packages for Corporate Planner.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {corporatePackages.map((pkg) => (
                <div 
                  key={pkg._id} 
                  className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group border ${
                    pkg.isPopular ? "border-[#C5A059] ring-2 ring-[#C5A059]/30" : "border-[#E8DFD1]"
                  }`}
                >
                  <div>
                    <div className="relative h-52 bg-neutral-100 overflow-hidden">
                      <img 
                        src={pkg.image} 
                        alt={pkg.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md text-[#DFBC71] text-xs font-bold px-3 py-1 rounded-full border border-[#C5A059]/40">
                        ₹{Number(pkg.price).toLocaleString("en-IN")}
                      </div>

                      {pkg.isPopular && (
                        <div className="absolute top-3 right-12 bg-[#C5A059] text-neutral-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                          Most Popular
                        </div>
                      )}

                      <button 
                        onClick={() => handleDeletePackage(pkg._id!, pkg.name)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-red-600 flex items-center justify-center shadow-md hover:scale-110 transition cursor-pointer"
                        title="Delete Package"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="p-6 space-y-2.5">
                      <h3 className="font-serif text-lg font-bold text-neutral-900 line-clamp-1">
                        {pkg.name}
                      </h3>
                      <p className="text-neutral-500 text-xs font-light leading-relaxed line-clamp-2">
                        {pkg.description}
                      </p>

                      {pkg.features && pkg.features.length > 0 && (
                        <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                          {pkg.features.slice(0, 4).map((feat, i) => (
                            <div key={i} className="text-xs text-neutral-600 flex items-center gap-2 line-clamp-1">
                              <CheckCircle2 size={13} className="text-[#C5A059] shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] border-t border-[#E8DFD1] flex items-center justify-between text-xs text-neutral-600">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <CheckCircle2 size={13} /> Active on Corporate Page
                    </span>
                    <span className="text-neutral-400 text-[10px]">
                      WhatsApp Ready
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 5: WALL & DOOR GALLERY SHOWCASE ================= */}
      {activeTab === "wall-gallery" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#E8DFD1] p-6 rounded-3xl shadow-sm">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif text-2xl font-bold text-neutral-900">Wall & Door Decoration Gallery</h2>
                <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
                  Live on /services/wall-decoration
                </span>
              </div>
              <p className="text-neutral-500 text-xs font-light mt-1">
                Yahan se Wall & Door Decoration page ke "Visual Showcase" gallery ki photos add ya remove karein.
              </p>
            </div>

            <button 
              onClick={() => {
                setNewWallGalleryImg("");
                setShowWallGalleryModal(true);
              }}
              className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 shadow-md transition cursor-pointer shrink-0"
            >
              <Plus size={16} />
              <span>Add Gallery Image</span>
            </button>
          </div>

          {loading ? (
            <div className="bg-white border border-[#E8DFD1] rounded-3xl p-12 text-center text-neutral-500 text-sm flex items-center justify-center space-x-2">
              <Loader2 size={18} className="animate-spin text-amber-600" />
              <span>Loading gallery images...</span>
            </div>
          ) : wallGallery.length === 0 ? (
            <div className="bg-white border border-[#E8DFD1] rounded-3xl p-12 text-center space-y-3">
              <ImageIcon size={36} className="text-neutral-300 mx-auto" />
              <h4 className="font-bold text-neutral-800 text-sm">No Gallery Images Found</h4>
              <p className="text-xs text-neutral-500">Click "Add Gallery Image" to upload photos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wallGallery.map((img, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group border border-[#E8DFD1]"
                >
                  <div className="relative h-60 bg-neutral-100 overflow-hidden">
                    <img 
                      src={img} 
                      alt={`Wall Gallery ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md text-[#DFBC71] text-[10px] font-bold px-3 py-1 rounded-full border border-[#C5A059]/40">
                      Photo #{idx + 1}
                    </div>

                    <button 
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: "Delete this photo?",
                          text: "This image will be removed from Wall & Door Gallery.",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#EF4444",
                          cancelButtonColor: "#6B7280",
                          confirmButtonText: "Yes, delete it!"
                        });
                        if (result.isConfirmed) {
                          const updated = wallGallery.filter((_, i) => i !== idx);
                          await saveWallGalleryToBackend(updated);
                        }
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-red-600 flex items-center justify-center shadow-md hover:scale-110 transition cursor-pointer"
                      title="Delete Image"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] border-t border-[#E8DFD1] flex items-center justify-between text-xs text-neutral-600">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                      <CheckCircle2 size={13} /> Active in Wall Gallery
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= ADD GENERAL THEME MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-amber-300 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Sparkles size={18} className="text-amber-600" />
                <span>Add New Theme Decoration</span>
              </h3>
              <button 
                type="button" 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddThemeSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-700 font-bold mb-1.5">Theme Title *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Royal Wedding Reception Backdrop"
                  value={newTheme.name} 
                  onChange={e => setNewTheme({ ...newTheme, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 font-bold mb-1.5">Category *</label>
                  <select 
                    value={newTheme.category} 
                    onChange={e => setNewTheme({ ...newTheme, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="Festive & Party">Festive & Party</option>
                    <option value="Wedding & Pre-Wedding">Wedding & Pre-Wedding</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Home & Housewarming">Home & Housewarming</option>
                    <option value="Corporate & Office">Corporate & Office</option>
                    <option value="Romantic & Anniversary">Romantic & Anniversary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-bold mb-1.5">Starting Price (₹)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 9999 or 14,999"
                    value={newTheme.price} 
                    onChange={e => setNewTheme({ ...newTheme, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1.5">Image Upload / File *</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <label className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 cursor-pointer font-semibold transition">
                      <Upload size={14} />
                      <span>{uploadingImage ? "Uploading to Cloudinary..." : "Choose File to Upload"}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        disabled={uploadingImage}
                        onChange={e => handleImageUpload(e, "theme")} 
                      />
                    </label>
                    <span className="text-[11px] text-neutral-400">or paste URL below</span>
                  </div>

                  <input 
                    type="text" 
                    placeholder="https://example.com/theme.jpg or Cloudinary Link"
                    value={newTheme.image} 
                    onChange={e => setNewTheme({ ...newTheme, image: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 text-[11px]"
                  />

                  {newTheme.image && (
                    <div className="relative aspect-[16/9] w-full max-h-36 rounded-xl overflow-hidden border border-amber-200 bg-neutral-50 mt-2">
                      <img src={newTheme.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1.5">Description</label>
                <textarea 
                  rows={2}
                  placeholder="Describe floral elements, lighting, venue suitability..."
                  value={newTheme.description} 
                  onChange={e => setNewTheme({ ...newTheme, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-amber-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 resize-none text-xs"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-neutral-100">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-100 text-neutral-600 font-bold hover:bg-neutral-200 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={savingThemes || uploadingImage}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold hover:bg-amber-400 transition shadow-sm flex items-center space-x-1.5 cursor-pointer"
                >
                  {savingThemes ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Publish Theme</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= ADD PACKAGE MODAL (RING & WALL) ================= */}
      {showPkgModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-amber-300 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Plus size={18} className="text-amber-600" />
                <span>
                  Add Package for {
                    newPkg.pageTarget === "ring-decoration" 
                      ? "Ring Ceremony" 
                      : newPkg.pageTarget === "corporate-planner"
                      ? "Corporate Planner"
                      : "Wall & Door Decor"
                  }
                </span>
              </h3>
              <button 
                type="button" 
                onClick={() => setShowPkgModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPackageSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-700 font-bold mb-1.5">Target Page *</label>
                <select 
                  value={newPkg.pageTarget} 
                  onChange={e => setNewPkg({ ...newPkg, pageTarget: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 font-medium"
                >
                  <option value="ring-decoration">Ring Decoration (/services/ring-decoration)</option>
                  <option value="wall-decoration">Wall Decoration (/services/wall-decoration)</option>
                  <option value="corporate-planner">Corporate Planner (/about)</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1.5">Package Title *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Royal Golden Canopy Decor"
                  value={newPkg.name} 
                  onChange={e => setNewPkg({ ...newPkg, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-neutral-700 font-bold mb-1.5">Price (₹) *</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    placeholder="e.g. 12999"
                    value={newPkg.price} 
                    onChange={e => setNewPkg({ ...newPkg, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div className="pt-5">
                  <label className="flex items-center space-x-2 cursor-pointer font-bold text-neutral-800">
                    <input 
                      type="checkbox"
                      checked={newPkg.isPopular}
                      onChange={e => setNewPkg({ ...newPkg, isPopular: e.target.checked })}
                      className="w-4 h-4 text-amber-500 rounded"
                    />
                    <span>Mark as "Most Popular"</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1.5">Package Image *</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <label className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-800 cursor-pointer font-semibold transition">
                      <Upload size={14} />
                      <span>{uploadingImage ? "Uploading to Cloudinary..." : "Choose File to Upload"}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        disabled={uploadingImage}
                        onChange={e => handleImageUpload(e, "package")} 
                      />
                    </label>
                    <span className="text-[11px] text-neutral-400">or paste URL below</span>
                  </div>

                  <input 
                    type="text" 
                    placeholder="https://... or /ceremanypic1.png"
                    value={newPkg.image} 
                    onChange={e => setNewPkg({ ...newPkg, image: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-neutral-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 text-[11px]"
                  />

                  {newPkg.image && (
                    <div className="relative aspect-[16/9] w-full max-h-36 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 mt-2">
                      <img src={newPkg.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1.5">Package Description</label>
                <textarea 
                  rows={2}
                  placeholder="Describe stage setup, arch style, lighting elements..."
                  value={newPkg.description} 
                  onChange={e => setNewPkg({ ...newPkg, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-neutral-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 resize-none text-xs"
                />
              </div>

              <div>
                <label className="block text-neutral-700 font-bold mb-1.5">
                  Included Features (1 feature per line)
                </label>
                <textarea 
                  rows={3}
                  placeholder={"Circular Floral Arch\nFresh Roses & Orchids\nWarm Fairy Lights"}
                  value={newPkg.featuresText} 
                  onChange={e => setNewPkg({ ...newPkg, featuresText: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-neutral-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 font-mono text-xs"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-neutral-100">
                <button 
                  type="button" 
                  onClick={() => setShowPkgModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-100 text-neutral-600 font-bold hover:bg-neutral-200 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={savingPkg || uploadingImage}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold hover:bg-amber-400 transition shadow-sm flex items-center space-x-1.5 cursor-pointer"
                >
                  {savingPkg ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Publish Package</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= ADD WALL GALLERY IMAGE MODAL ================= */}
      {showWallGalleryModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-amber-300 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-neutral-900 flex items-center gap-2">
                <ImageIcon size={18} className="text-amber-600" />
                <span>Add Wall & Door Gallery Image</span>
              </h3>
              <button 
                type="button" 
                onClick={() => setShowWallGalleryModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newWallGalleryImg.trim()) {
                  toast.error("Please upload or provide an image URL");
                  return;
                }
                const updated = [newWallGalleryImg.trim(), ...wallGallery];
                const success = await saveWallGalleryToBackend(updated);
                if (success) {
                  setShowWallGalleryModal(false);
                  setNewWallGalleryImg("");
                }
              }} 
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-neutral-700 font-bold mb-1.5">Gallery Image *</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <label className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 text-neutral-800 cursor-pointer font-semibold transition">
                      <Upload size={14} />
                      <span>{uploadingImage ? "Uploading to Cloudinary..." : "Choose File to Upload"}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        disabled={uploadingImage}
                        onChange={e => handleImageUpload(e, "wallGallery")} 
                      />
                    </label>
                    <span className="text-[11px] text-neutral-400">or paste URL below</span>
                  </div>

                  <input 
                    type="text" 
                    placeholder="https://... or /walldecoration.png"
                    value={newWallGalleryImg} 
                    onChange={e => setNewWallGalleryImg(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-neutral-200 bg-[#FFFDF9] focus:outline-none focus:border-amber-500 text-[11px]"
                  />

                  {newWallGalleryImg && (
                    <div className="relative aspect-[16/9] w-full max-h-48 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 mt-2">
                      <img src={newWallGalleryImg} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-neutral-100">
                <button 
                  type="button" 
                  onClick={() => setShowWallGalleryModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-neutral-100 text-neutral-600 font-bold hover:bg-neutral-200 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={savingWallGallery || uploadingImage}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold hover:bg-amber-400 transition shadow-sm flex items-center space-x-1.5 cursor-pointer"
                >
                  {savingWallGallery ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Add to Gallery</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}