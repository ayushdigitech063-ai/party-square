"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type WishlistProduct = {
  id: number;
  name: string;
  image?: string;
  src?: string;
  desc?: string;
  price?: string;
  category?: string;
};

type WishlistContextType = {
  wishlist: WishlistProduct[];
  toggleWishlist: (product: WishlistProduct) => void;
  isInWishlist: (productId: number) => boolean;
  removeFromWishlist: (productId: number) => void;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);

  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wishlist");

      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to save wishlist:", error);
    }
  }, [wishlist]);

  const toggleWishlist = (product: WishlistProduct) => {
    setWishlist((current) => {
      const exists = current.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return current.filter(
          (item) => item.id !== product.id
        );
      }

      return [...current, product];
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((current) =>
      current.filter(
        (item) => item.id !== productId
      )
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}