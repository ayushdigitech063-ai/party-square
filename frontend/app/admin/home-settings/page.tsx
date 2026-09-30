"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Save, 
  Image as ImageIcon, 
  Type, 
  Link as LinkIcon, 
  Phone, 
  MapPin, 
  Mail, 
  Layout, 
  Info, 
  Briefcase, 
  Star, 
  UploadCloud, X
} from "lucide-react";
import toast from "react-hot-toast";

import { API_URL } from "@/config";

function HomeSettingsContent() {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("tab") || "hero";

  const [loading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState({
    banners: [
      {
        headline: "Transform Your Dream Events Into Reality",
        subheadline: "DreamDeco provides premium decoration services for weddings, birthdays, and corporate events across Jaipur.",
        buttonText: "Explore Themes",
        buttonLink: "/decorations",
        backgroundImage: ""
      },
      {
        headline: "Luxury Wedding Decorations",
        subheadline: "Make your special day unforgettable with our premium wedding decor.",
        buttonText: "View Wedding Themes",
        buttonLink: "/decorations?category=wedding",
        backgroundImage: ""
      },
      {
        headline: "Birthday Party Setups",
        subheadline: "Exciting and fun decoration themes for kids and adults.",
        buttonText: "View Birthday Themes",
        buttonLink: "/decorations?category=birthday",
        backgroundImage: ""
      }
    ]
  });

  const [liveShowcaseData, setLiveShowcaseData] = useState({
    badge: "LIVE SHOWCASE",
    heading: "Behind the Decor Artistry",
    description: "Experience the craftsmanship, lighting setups, and grand stage installations created by our core event team.",
    videoUrl: "/party-viedo.mp4",
    features: [
      { title: "Royal Mandap & Stage Sets", description: "Intricate stage backdrops designed with imported fresh flora, crystal chandeliers, and customized theme drapes." },
      { title: "Custom Floral & Candle Aisles", description: "Atmospheric aisle walkways lined with fairy lights, candle pillars, and scented exotic blooms." },
      { title: "Bespoke Palette & Moodboards", description: "Tailored 3D design previews before execution to ensure every color palette matches your vision." }
    ]
  });

  const [servicesData, setServicesData] = useState({
    badge: "OUR SIGNATURE SERVICES",
    headingLine1: "Decor for every",
    headingLine2: "occasion, beautifully done",
    description1: "We specialize in curating breathtaking, custom-tailored environments for all of life's most precious celebrations — seamlessly blending artistic vision with flawless execution.",
    description2: "From grand destination weddings and luxury anniversary celebrations to intimate home gatherings and vibrant festive setups, we transform ordinary spaces into timeless visual poetry.",
    bullets: [
      "100% Customized themes tailored to your unique preferences & budget.",
      "Premium fresh floral arrangements, luxury drapery & lighting effects.",
      "End-to-end on-site setup and professional event styling execution."
    ],
    buttonText: "Explore all collections",
    buttonLink: "/services",
    featuredService: {
      title: "Wedding Decoration",
      subtitle: "Make your big day magical with royal mandaps & floral setups",
      image: "/wedding.png",
      tag: "Royal Look & Grand Stages",
    },
    otherServices: [
      {
        title: "Birthday Decoration",
        subtitle: "Celebrate in style with custom themes and balloon artistry",
        image: "/birthdaykids.png",
        tag: "Fun & Kids",
      },
      {
        title: "Corporate Events",
        subtitle: "Professional, elegant setups for conferences and galas",
        image: "/coprateoffice.png",
        tag: "Business",
      },
      {
        title: "Home Decoration",
        subtitle: "Beautiful spaces and festive makeovers with better vibes",
        image: "/homedecoration.png",
        tag: "Cozy Vibe",
      }
    ]
  });

  const [testimonialsData, setTestimonialsData] = useState({
    badge: "Testimonials",
    heading1: "Customer",
    heading2: "Reviews",
    rating: "4.7",
    reviewCount: 9,
    reviews: [
      {
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        name: "Atharv Surana",
        location: "Bhopal",
        text: "Thank you for the decoration. It was nicely done and everyone loved it. Very cooperative and budget friendly.",
      },
      {
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        name: "Sourav Dugar",
        location: "Thane",
        text: "I have contacted this vendor just a day before my kid’s birthday and they have done an awesome job.",
      }
    ]
  });

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/homepage`);
        if (res.ok) {
          const data = await res.json();
          const heroSection = data.sections?.find((s: any) => s.sectionKey === 'hero_banner');
          if (heroSection && heroSection.contentData) {
            if (heroSection.contentData.banners && Array.isArray(heroSection.contentData.banners)) {
              setHeroData({ banners: heroSection.contentData.banners });
            } else if (heroSection.contentData.headline) {
              setHeroData(prev => {
                const newBanners = [...prev.banners];
                newBanners[0] = { ...newBanners[0], ...heroSection.contentData };
                return { banners: newBanners };
              });
            }
          }
          
          const showcaseSection = data.sections?.find((s: any) => s.sectionKey === 'live_showcase');
          if (showcaseSection && showcaseSection.contentData) {
            setLiveShowcaseData(showcaseSection.contentData);
          }

          const signatureServicesSection = data.sections?.find((s: any) => s.sectionKey === 'signature_services');
          if (signatureServicesSection && signatureServicesSection.contentData) {
            setServicesData(signatureServicesSection.contentData);
          }

          const testimonialsSection = data.sections?.find((s: any) => s.sectionKey === 'testimonials');
          if (testimonialsSection && testimonialsSection.contentData) {
            setTestimonialsData(testimonialsSection.contentData);
          }
        }
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomePageData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeSection === 'hero' || activeSection === 'live_showcase' || activeSection === 'services' || activeSection === 'testimonials') {
      try {
        const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
        const token = adminUser.token;
        
        let sectionKey = '';
        let dataToSave = null;
        let sectionName = '';

        if (activeSection === 'hero') {
          sectionKey = 'hero_banner';
          dataToSave = heroData;
          sectionName = 'Hero Banner';
        } else if (activeSection === 'live_showcase') {
          sectionKey = 'live_showcase';
          dataToSave = liveShowcaseData;
          sectionName = 'Live Showcase';
        } else if (activeSection === 'services') {
          sectionKey = 'signature_services';
          dataToSave = servicesData;
          sectionName = 'Signature Services';
        } else if (activeSection === 'testimonials') {
          sectionKey = 'testimonials';
          dataToSave = testimonialsData;
          sectionName = 'Testimonials';
        }

        const res = await fetch(`${API_URL}/api/homepage/sections/${sectionKey}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            contentData: dataToSave
          })
        });
        
        if (res.ok) {
          toast.success(`${sectionName} saved successfully!`, {
            style: { background: "#fff", color: "#182033", border: "1px solid #ECE9E2" },
          });
        } else {
          toast.error(`Failed to update ${sectionName}`);
        }
      } catch (error) {
        console.error(`Error saving ${activeSection}:`, error);
        toast.error("An error occurred while saving.");
      }
    } else {
      toast.success("Section updated successfully!", {
        style: { background: "#fff", color: "#182033", border: "1px solid #ECE9E2" },
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const loadingToast = toast.loading("Uploading image to Cloudinary...", {
      style: { background: "#fff", color: "#182033", border: "1px solid #ECE9E2" },
    });

    try {
      const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
      const token = adminUser.token;

      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setHeroData(prev => {
          const newBanners = [...prev.banners];
          newBanners[index] = { ...newBanners[index], backgroundImage: data.url };
          return { banners: newBanners };
        });
        toast.success("Image uploaded successfully!", { id: loadingToast });
      } else {
        throw new Error(data.message || "Failed to upload image");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "An error occurred during upload", { id: loadingToast });
    }
  };

  const handleHeroChange = (index: number, field: string, value: string) => {
    setHeroData(prev => {
      const newBanners = [...prev.banners];
      newBanners[index] = { ...newBanners[index], [field]: value };
      return { banners: newBanners };
    });
  };

  const handleLiveShowcaseChange = (field: string, value: string) => {
    setLiveShowcaseData(prev => ({ ...prev, [field]: value }));
  };

  const handleLiveShowcaseFeatureChange = (index: number, field: string, value: string) => {
    setLiveShowcaseData(prev => {
      const newFeatures = [...prev.features];
      newFeatures[index] = { ...newFeatures[index], [field]: value };
      return { ...prev, features: newFeatures };
    });
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const loadingToast = toast.loading("Uploading video to Cloudinary...", {
      style: { background: "#fff", color: "#182033", border: "1px solid #ECE9E2" },
    });

    try {
      const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
      const token = adminUser.token;

      const formData = new FormData();
      formData.append('image', file); // The backend uses upload.single('image') for all files

      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setLiveShowcaseData(prev => ({ ...prev, videoUrl: data.url }));
        toast.success("Video uploaded successfully!", { id: loadingToast });
      } else {
        throw new Error(data.message || "Failed to upload video");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "An error occurred during upload", { id: loadingToast });
    }
  };

  const handleServicesChange = (field: string, value: string) => {
    setServicesData(prev => ({ ...prev, [field]: value }));
  };

  const handleServicesBulletChange = (index: number, value: string) => {
    setServicesData(prev => {
      const newBullets = [...prev.bullets];
      newBullets[index] = value;
      return { ...prev, bullets: newBullets };
    });
  };

  if (loading) {
    return <div className="p-8 text-[#6F7787] text-[14px]">Loading Settings...</div>;
  }

  return (
    <div className="animate-in fade-in duration-500 w-full max-w-full">
      <div className="w-full">
        {/* Main Form Area */}
        <form onSubmit={handleSave} className="bg-[#FFFFFF] rounded-[24px] border border-[#ECE9E2] p-6 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] relative overflow-hidden">
          
          {/* Soft background glow effect for active form */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FFF4D6]/40 to-transparent rounded-full blur-3xl -z-10 -mr-20 -mt-20"></div>

          {/* ================= HERO SECTION ================= */}
          {activeSection === "hero" && (
            <div className="space-y-7 animate-in slide-in-from-bottom-2 fade-in duration-300">
              <div>
                <h3 className="text-[22px] font-extrabold text-black tracking-tight">Hero Banners</h3>
                <p className="text-[14px] text-black/70 mt-1 font-medium">Manage your carousel of up to 3 homepage banners.</p>
              </div>
              
              <div className="space-y-10">
                {heroData.banners.map((banner, index) => (
                  <div key={index} className="p-6 bg-[#FAFAFA] border border-[#ECE9E2] rounded-[20px] space-y-5">
                    <h4 className="text-[16px] font-bold text-[#182033] border-b border-[#ECE9E2] pb-3">Banner {index + 1}</h4>
                    
                    <InputField 
                      label="Main Headline" 
                      icon={<Type size={16}/>} 
                      value={banner.headline} 
                      onChange={(e) => handleHeroChange(index, 'headline', e.target.value)} 
                    />
                    <TextAreaField 
                      label="Subheadline" 
                      value={banner.subheadline} 
                      onChange={(e) => handleHeroChange(index, 'subheadline', e.target.value)} 
                      rows={2} 
                    />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField 
                        label="Button Text" 
                        icon={<Type size={16}/>} 
                        value={banner.buttonText} 
                        onChange={(e) => handleHeroChange(index, 'buttonText', e.target.value)} 
                      />
                      <InputField 
                        label="Button Link" 
                        icon={<LinkIcon size={16}/>} 
                        value={banner.buttonLink} 
                        onChange={(e) => handleHeroChange(index, 'buttonLink', e.target.value)} 
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-bold text-[#182033] mb-2">Background Image URL</label>
                      <InputField 
                        label="" 
                        icon={<LinkIcon size={16}/>} 
                        placeholder="Enter image URL or upload below" 
                        value={banner.backgroundImage} 
                        onChange={(e) => handleHeroChange(index, 'backgroundImage', e.target.value)} 
                      />
                      
                      <div className="relative mt-4 border-2 border-dashed border-[#ECE9E2] rounded-[16px] bg-[#FFFFFF] p-8 text-center hover:bg-[#FFF4D6]/30 hover:border-[#F5A000]/50 transition-all cursor-pointer group">
                        <input 
                          type="file" 
                          id={`heroImageUpload-${index}`} 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, index)}
                        />
                        <div className="w-12 h-12 rounded-full bg-[#FAFAFA] border border-[#ECE9E2] text-[#F5A000] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:bg-[#FFF4D6] group-hover:border-[#FFF4D6] transition-all shadow-sm">
                          <UploadCloud size={20} />
                        </div>
                        <p className="text-[14px] font-semibold text-[#182033]">Click to upload to Cloudinary</p>
                        <p className="text-[12px] text-[#6F7787] mt-1">High resolution SVG, PNG, JPG or GIF (max. 5MB)</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= LIVE SHOWCASE SECTION ================= */}
          {activeSection === "live_showcase" && (
            <div className="space-y-7 animate-in slide-in-from-bottom-2 fade-in duration-300">
              <div>
                <h3 className="text-[22px] font-extrabold text-black tracking-tight">Live Showcase Section</h3>
                <p className="text-[14px] text-black/70 mt-1 font-medium">Manage the behind-the-scenes video and key feature cards.</p>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-[#FAFAFA] border border-[#ECE9E2] rounded-[20px] space-y-5">
                  <h4 className="text-[16px] font-bold text-[#182033] border-b border-[#ECE9E2] pb-3">Header Details</h4>
                  <InputField 
                    label="Section Badge" 
                    icon={<Star size={16}/>} 
                    value={liveShowcaseData.badge} 
                    onChange={(e) => handleLiveShowcaseChange('badge', e.target.value)} 
                  />
                  <InputField 
                    label="Main Heading" 
                    icon={<Type size={16}/>} 
                    value={liveShowcaseData.heading} 
                    onChange={(e) => handleLiveShowcaseChange('heading', e.target.value)} 
                  />
                  <TextAreaField 
                    label="Description" 
                    value={liveShowcaseData.description} 
                    onChange={(e) => handleLiveShowcaseChange('description', e.target.value)} 
                    rows={2} 
                  />
                  <InputField 
                    label="Video URL" 
                    icon={<LinkIcon size={16}/>} 
                    value={liveShowcaseData.videoUrl} 
                    onChange={(e) => handleLiveShowcaseChange('videoUrl', e.target.value)} 
                  />
                  
                  <div className="pt-2 border-t border-[#ECE9E2] mt-4">
                    <label className="block text-[13px] font-bold text-black mb-3">Upload Video (MP4)</label>
                    <div className="relative group cursor-pointer">
                      <div className="absolute inset-0 bg-[#FFF4D6] rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative border-2 border-dashed border-[#ECE9E2] group-hover:border-[#F5A000] rounded-[16px] p-6 text-center transition-colors">
                        <UploadCloud className="mx-auto h-8 w-8 text-[#6F7787] group-hover:text-[#F5A000] mb-2 transition-colors" />
                        <p className="text-[13px] font-semibold text-[#182033]">Click to upload a video</p>
                        <p className="text-[11px] text-[#6F7787] mt-1">MP4, WebM (max 10MB recommended)</p>
                        <input 
                          type="file" 
                          accept="video/*" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleVideoUpload}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-[#FAFAFA] border border-[#ECE9E2] rounded-[20px] space-y-5">
                  <h4 className="text-[16px] font-bold text-[#182033] border-b border-[#ECE9E2] pb-3">Features (3 Cards)</h4>
                  
                  <div className="space-y-4">
                    {liveShowcaseData.features.map((feature, index) => (
                      <div key={index} className="bg-white p-4 border border-[#ECE9E2] rounded-[16px]">
                        <p className="text-xs font-bold text-[#6F7787] mb-3 uppercase tracking-wider">Feature 0{index + 1}</p>
                        <div className="space-y-3">
                          <InputField 
                            label="Title" 
                            icon={<Type size={14}/>} 
                            value={feature.title} 
                            onChange={(e) => handleLiveShowcaseFeatureChange(index, 'title', e.target.value)}
                          />
                          <TextAreaField 
                            label="Description" 
                            value={feature.description} 
                            onChange={(e) => handleLiveShowcaseFeatureChange(index, 'description', e.target.value)}
                            rows={2} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= SERVICES SECTION ================= */}
          {activeSection === "services" && (
            <div className="space-y-7 animate-in slide-in-from-bottom-2 fade-in duration-300">
              <div>
                <h3 className="text-[22px] font-extrabold text-black tracking-tight">Signature Services</h3>
                <p className="text-[14px] text-black/70 mt-1 font-medium">Control the text and bullet points displayed in the signature services section.</p>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 bg-[#FAFAFA] border border-[#ECE9E2] rounded-[20px] space-y-5">
                  <h4 className="text-[16px] font-bold text-[#182033] border-b border-[#ECE9E2] pb-3">Header Details</h4>
                  
                  <InputField 
                    label="Badge Text" 
                    icon={<Star size={16}/>} 
                    value={servicesData.badge} 
                    onChange={(e) => handleServicesChange('badge', e.target.value)} 
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField 
                      label="Heading Line 1" 
                      icon={<Type size={16}/>} 
                      value={servicesData.headingLine1} 
                      onChange={(e) => handleServicesChange('headingLine1', e.target.value)} 
                    />
                    <InputField 
                      label="Heading Line 2 (Italic)" 
                      icon={<Type size={16}/>} 
                      value={servicesData.headingLine2} 
                      onChange={(e) => handleServicesChange('headingLine2', e.target.value)} 
                    />
                  </div>
                  
                  <TextAreaField 
                    label="Description Paragraph 1" 
                    value={servicesData.description1} 
                    onChange={(e) => handleServicesChange('description1', e.target.value)} 
                    rows={2} 
                  />
                  <TextAreaField 
                    label="Description Paragraph 2" 
                    value={servicesData.description2} 
                    onChange={(e) => handleServicesChange('description2', e.target.value)} 
                    rows={2} 
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField 
                      label="Button Text" 
                      icon={<Type size={16}/>} 
                      value={servicesData.buttonText} 
                      onChange={(e) => handleServicesChange('buttonText', e.target.value)} 
                    />
                    <InputField 
                      label="Button Link" 
                      icon={<LinkIcon size={16}/>} 
                      value={servicesData.buttonLink} 
                      onChange={(e) => handleServicesChange('buttonLink', e.target.value)} 
                    />
                  </div>
                </div>

                <div className="p-6 bg-[#FAFAFA] border border-[#ECE9E2] rounded-[20px] space-y-5">
                  <h4 className="text-[16px] font-bold text-[#182033] border-b border-[#ECE9E2] pb-3">Bullet Points</h4>
                  <div className="space-y-4">
                    {servicesData.bullets.map((bullet, idx) => (
                      <InputField 
                        key={idx}
                        label={`Bullet 0${idx + 1}`} 
                        icon={<Star size={16}/>} 
                        value={bullet} 
                        onChange={(e) => handleServicesBulletChange(idx, e.target.value)} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 bg-[#FAFAFA] border border-[#ECE9E2] rounded-[16px] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-[14px] font-bold text-black">Services Mapping</p>
                    <p className="text-[12px] text-black/70 mt-1">The 4 service cards (Wedding, Birthday, etc.) are synced globally.</p>
                  </div>
                  <span className="px-4 py-2 bg-[#16A36A]/10 text-[#16A36A] text-[12px] font-bold rounded-full border border-[#16A36A]/20 whitespace-nowrap">
                    Auto Sync Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ================= TESTIMONIALS SECTION ================= */}
          {activeSection === "testimonials" && (
            <div className="space-y-7 animate-in slide-in-from-bottom-2 fade-in duration-300">
              <div>
                <h3 className="text-[22px] font-extrabold text-black tracking-tight">Testimonials</h3>
                <p className="text-[14px] text-black/70 mt-1 font-medium">Manage the reviews section on the homepage.</p>
              </div>
              
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField 
                    label="Badge Text" 
                    icon={<Type size={16}/>} 
                    value={testimonialsData.badge}
                    onChange={(e) => setTestimonialsData({...testimonialsData, badge: e.target.value})}
                  />
                  <InputField 
                    label="Rating Text (e.g. 4.7)" 
                    icon={<Star size={16}/>} 
                    value={testimonialsData.rating}
                    onChange={(e) => setTestimonialsData({...testimonialsData, rating: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField 
                    label="Heading Line 1" 
                    icon={<Type size={16}/>} 
                    value={testimonialsData.heading1}
                    onChange={(e) => setTestimonialsData({...testimonialsData, heading1: e.target.value})}
                  />
                  <InputField 
                    label="Heading Line 2" 
                    icon={<Type size={16}/>} 
                    value={testimonialsData.heading2}
                    onChange={(e) => setTestimonialsData({...testimonialsData, heading2: e.target.value})}
                  />
                </div>

                <div className="pt-4 border-t border-[#ECE9E2]">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-[14px] font-bold text-[#182033]">Reviews List</label>
                    <button 
                      type="button" 
                      onClick={() => setTestimonialsData({
                        ...testimonialsData, 
                        reviews: [...testimonialsData.reviews, { image: "", name: "New Client", location: "City", text: "New review text" }]
                      })}
                      className="text-[12px] font-bold bg-[#F5A000]/10 text-[#F5A000] px-3 py-1.5 rounded-full hover:bg-[#F5A000]/20 transition-colors"
                    >
                      + Add Review
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {testimonialsData.reviews.map((review, idx) => (
                      <div key={idx} className="bg-[#FAFAFA] border border-[#ECE9E2] rounded-[16px] p-5 relative group">
                        <button 
                          type="button"
                          onClick={() => {
                            const newReviews = [...testimonialsData.reviews];
                            newReviews.splice(idx, 1);
                            setTestimonialsData({...testimonialsData, reviews: newReviews});
                          }}
                          className="absolute right-4 top-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-[12px] font-bold text-black/70 mb-1.5">Client Name</label>
                            <input 
                              type="text" 
                              value={review.name}
                              onChange={(e) => {
                                const newReviews = [...testimonialsData.reviews];
                                newReviews[idx].name = e.target.value;
                                setTestimonialsData({...testimonialsData, reviews: newReviews});
                              }}
                              className="w-full h-10 px-3 bg-white border border-[#ECE9E2] rounded-[10px] text-[13px] text-black outline-none focus:border-[#F5A000] transition-colors" 
                            />
                          </div>
                          <div>
                            <label className="block text-[12px] font-bold text-black/70 mb-1.5">Location</label>
                            <input 
                              type="text" 
                              value={review.location}
                              onChange={(e) => {
                                const newReviews = [...testimonialsData.reviews];
                                newReviews[idx].location = e.target.value;
                                setTestimonialsData({...testimonialsData, reviews: newReviews});
                              }}
                              className="w-full h-10 px-3 bg-white border border-[#ECE9E2] rounded-[10px] text-[13px] text-black outline-none focus:border-[#F5A000] transition-colors" 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-[12px] font-bold text-black/70 mb-1.5">Review Text</label>
                          <textarea 
                            value={review.text}
                            onChange={(e) => {
                              const newReviews = [...testimonialsData.reviews];
                              newReviews[idx].text = e.target.value;
                              setTestimonialsData({...testimonialsData, reviews: newReviews});
                            }}
                            rows={2}
                            className="w-full p-3 bg-white border border-[#ECE9E2] rounded-[10px] text-[13px] text-black outline-none focus:border-[#F5A000] transition-colors resize-none" 
                          />
                        </div>
                        
                        <div className="mt-4">
                          <label className="block text-[12px] font-bold text-black/70 mb-1.5">Profile Image URL</label>
                          <input 
                            type="text" 
                            value={review.image}
                            onChange={(e) => {
                              const newReviews = [...testimonialsData.reviews];
                              newReviews[idx].image = e.target.value;
                              setTestimonialsData({...testimonialsData, reviews: newReviews});
                            }}
                            className="w-full h-10 px-3 bg-white border border-[#ECE9E2] rounded-[10px] text-[13px] text-black outline-none focus:border-[#F5A000] transition-colors" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= FOOTER SECTION ================= */}
          {activeSection === "footer" && (
            <div className="space-y-7 animate-in slide-in-from-bottom-2 fade-in duration-300">
              <div>
                <h3 className="text-[22px] font-extrabold text-black tracking-tight">Contact & Footer</h3>
                <p className="text-[14px] text-black/70 mt-1 font-medium">Update your business contact details and social media links.</p>
              </div>
              
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField label="Contact Phone" icon={<Phone size={16}/>} defaultValue="+91 98765 43210" />
                  <InputField label="Contact Email" icon={<Mail size={16}/>} defaultValue="hello@dreamdeco.com" />
                </div>
                
                <TextAreaField label="Office Address" defaultValue="123 Luxury Lane, Malviya Nagar, Jaipur, Rajasthan 302017" rows={3} />
                
                <div className="pt-2">
                  <label className="block text-[13px] font-bold text-[#182033] mb-3">Social Media Links</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField label="" icon={<LinkIcon size={16}/>} defaultValue="https://instagram.com/dreamdeco" placeholder="Instagram URL" />
                    <InputField label="" icon={<LinkIcon size={16}/>} defaultValue="https://facebook.com/dreamdeco" placeholder="Facebook URL" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Global Save Button */}
          <div className="mt-10 pt-6 border-t border-[#ECE9E2] flex justify-end">
            <button 
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-[#182033] text-white font-semibold rounded-[14px] hover:bg-[#F5A000] transition-all duration-300 shadow-[0_4px_14px_rgba(24,32,51,0.2)] hover:shadow-[0_6px_20px_rgba(245,160,0,0.3)] hover:-translate-y-0.5"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default function HomePageSettings() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[#6F7787]">Loading editor...</div>}>
      <HomeSettingsContent />
    </Suspense>
  )
}

// ================= MODERN HELPERS =================

function InputField({ label, icon, placeholder, defaultValue, value, onChange }: { label?: string, icon?: React.ReactNode, placeholder?: string, defaultValue?: string, value?: string, onChange?: (e: any) => void }) {
  return (
    <div>
      {label && <label className="block text-[13px] font-bold text-[#182033] mb-2">{label}</label>}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-4 text-[#6F7787] pointer-events-none">
            {icon}
          </div>
        )}
        <input 
          type="text"
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          className={`w-full ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3 bg-[#FAFAFA] border border-[#ECE9E2] rounded-[14px] text-[14px] text-[#182033] font-medium outline-none transition-all duration-200 focus:bg-[#FFFFFF] focus:border-[#F5A000] focus:ring-4 focus:ring-[#FFF4D6]`}
        />
      </div>
    </div>
  )
}

function TextAreaField({ label, placeholder, defaultValue, value, onChange, rows = 3 }: { label?: string, placeholder?: string, defaultValue?: string, value?: string, onChange?: (e: any) => void, rows?: number }) {
  return (
    <div>
      {label && <label className="block text-[13px] font-bold text-[#182033] mb-2">{label}</label>}
      <textarea 
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full p-4 bg-[#FAFAFA] border border-[#ECE9E2] rounded-[14px] text-[14px] text-[#182033] font-medium outline-none transition-all duration-200 focus:bg-[#FFFFFF] focus:border-[#F5A000] focus:ring-4 focus:ring-[#FFF4D6] resize-y"
      />
    </div>
  )
}
