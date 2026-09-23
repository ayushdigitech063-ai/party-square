"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
  id: string;
  slug?: string;
  name: string;
  price: string;
  numericPrice?: number;
  image: string;
  desc: string;
  category?: string;
  quantity: number;
}

interface CartContextType {
  cart: Product[];
  likes: Product[];
  addToCart: (product: Omit<Product, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  toggleLike: (product: Product) => void;
  isLiked: (id: string) => boolean;
  notification: { product: Product; message: string } | null;
  closeNotification: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);
  const [likes, setLikes] = useState<Product[]>([]);
  const [notification, setNotification] = useState<{ product: Product; message: string } | null>(null);

  // Load from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("dreamdeco_cart");
    const savedLikes = localStorage.getItem("dreamdeco_likes");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedLikes) setLikes(JSON.parse(savedLikes));
  }, []);

  // Save to localStorage whenever cart/likes change
  useEffect(() => {
    localStorage.setItem("dreamdeco_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("dreamdeco_likes", JSON.stringify(likes));
  }, [likes]);

  const addToCart = (product: Omit<Product, "quantity">, quantityToAdd: number = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        // If item already exists in cart, update its quantity
        const updatedCart = [...prevCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + quantityToAdd,
        };
        return updatedCart;
      } else {
        // If new item, add it with the specified quantity
        return [...prevCart, { ...product, quantity: quantityToAdd }];
      }
    });

    // Find the product with quantity for notification display
    const notificationProduct: Product = { ...product, quantity: quantityToAdd };

    // Trigger image toast notification
    setNotification({
      product: notificationProduct,
      message: "successfully added to your basket!",
    });

    // Auto-hide after 4 seconds
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const toggleLike = (product: Product) => {
    if (likes.some((item) => item.id === product.id)) {
      setLikes(likes.filter((item) => item.id !== product.id));
    } else {
      setLikes([...likes, product]);
    }
  };

  const isLiked = (id: string) => {
    return likes.some((item) => item.id === id);
  };

  // ✅ total items count for the navbar badge
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, likes, addToCart, removeFromCart, toggleLike, isLiked, notification, closeNotification, cartCount }}
    >
{notification && (
  <div className="fixed bottom-6 left-6 sm:left-10 z-50 bg-[#1A1A1A] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-red-500/30 animate-slide-up max-w-md">
    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-red-50 border border-red-200">
      <img src={notification.product.image} alt={notification.product.name} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 pr-2">
      <p className="text-xs sm:text-sm font-medium text-gray-100 leading-tight">
        <span className="font-bold text-red-400">{notification.product.name}</span> ({notification.product.quantity} Units) {notification.message}
      </p>
    </div>
    <button
      onClick={closeNotification}
      className="text-gray-400 hover:text-white p-1 transition cursor-pointer"
      aria-label="Close"
    >
      ✕
    </button>
  </div>
)}
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}