"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

export default function WhatsAppFloat() {
  const pathname = usePathname();
  const [message, setMessage] = useState("Hi Party Square! I need some help with your services.");
  const [showTooltip, setShowTooltip] = useState(true);

  // Phone number without the '+' sign
  const PHONE_NUMBER = "918385973582"; 

  useEffect(() => {
    const updateMessage = () => {
      const currentUrl = typeof window !== "undefined" ? window.location.href : "";

      if (pathname?.includes("/card/")) {
        // Try to find the title and price from the DOM for a richer message
        const titleElement = document.querySelector('h1');
        const priceElement = document.querySelector('.text-3xl.font-extrabold');
        
        let productName = titleElement ? titleElement.textContent?.trim() : null;
        let productPrice = priceElement ? priceElement.textContent?.trim() : null;

        let msg = `Hi Party Square! I want more info about this product`;
        
        if (productName) {
          msg = `Hi Party Square! I want more info about the product "${productName}"`;
          if (productPrice) {
            msg += ` and its price (${productPrice})`;
          }
        }
        
        msg += `.\n\nHere is the link: ${currentUrl}`;
        setMessage(msg);

      } else if (pathname?.includes("/services/")) {
        setMessage(`Hi Party Square! I want to inquire about this service:\n${currentUrl}`);
      } else {
        setMessage("Hi Party Square! I need some help with your services.");
      }
    };

    // Run immediately and also wait a tiny bit for DOM to render product details if navigating on client side
    updateMessage();
    const timeout = setTimeout(updateMessage, 500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
      {/* Tooltip Popup */}
      {showTooltip && (
        <div className="bg-white border border-[#E8E8E3] shadow-[0_10px_25px_rgba(0,0,0,0.1)] rounded-2xl p-3 px-4 pr-10 relative animate-bounce hover:animate-none">
          <button 
            onClick={() => setShowTooltip(false)} 
            className="absolute top-2.5 right-2.5 text-[#6B706C] hover:text-[#202522] transition-colors"
          >
            <X size={14} />
          </button>
          <p className="text-sm font-semibold text-[#202522]">Hi! How can I help you? 👋</p>
        </div>
      )}

      {/* WhatsApp Button */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="w-14 h-14 bg-[#25D366] hover:bg-[#1EBE57] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-transform duration-300 hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 24 24">
          <path d="M12.031 0C5.385 0 .002 5.385.002 12.03c0 2.128.552 4.195 1.6 6.007L.002 24l6.113-1.603a11.96 11.96 0 0 0 5.916 1.564c6.643 0 12.025-5.384 12.025-12.028S18.675 0 12.031 0zm0 21.986a9.976 9.976 0 0 1-5.076-1.378l-.364-.216-3.774.989.998-3.682-.236-.376a9.957 9.957 0 0 1-1.528-5.292c0-5.503 4.478-9.982 9.98-9.982 5.503 0 9.981 4.479 9.981 9.982 0 5.503-4.478 9.983-9.981 9.983zm5.474-7.467c-.3-.15-1.777-.878-2.052-.979-.275-.1-.475-.15-.675.15-.2.3-.775.979-.95 1.179-.175.2-.35.225-.65.075-1.258-.63-2.315-1.428-3.197-2.617-.225-.3-.025-.45.125-.6.135-.135.3-.3.45-.45.15-.15.2-.25.3-.425.1-.175.05-.325-.025-.475-.075-.15-.675-1.625-.925-2.225-.25-.6-.5-.525-.675-.525-.175 0-.375-.025-.575-.025s-.525.075-.8.375c-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.125 3.225 5.125 4.525.725.3 1.275.475 1.725.625.725.225 1.375.2 1.9.125.575-.1 1.777-.725 2.025-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/>
        </svg>
      </a>
    </div>
  );
}
