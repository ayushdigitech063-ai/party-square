"use client";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import {useWishlist} from "../context/wishlistcontext";

export default function Wishlist() {
    const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();
  return (
       <section className="min-h-screen bg-[#FAF7F2] px-6 py-12">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-amber-200 pb-6 mb-8">

          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              My Wishlist
            </h1>

            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
              Keep your favorite decorations close
            </p>
          </div>

        </div>


        {/* EMPTY WISHLIST */}

        {wishlist.length === 0 ? (

          <div className="rounded-[22px] border border-[#eadfd5] bg-white px-6 py-20 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#fff1ed] text-[#741616]">

              <Heart
                size={38}
                strokeWidth={1.5}
              />

            </div>

            <h2 className="mt-6 font-serif text-3xl text-[#302823]">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#81776f]">
              You haven't added any decorations to your
              wishlist yet. Explore our beautiful collections
              and save your favorites here.
            </p>

            <button className="mt-6 rounded-full bg-[#741616] px-6 py-3 text-sm font-semibold text-white">
              Explore Decorations
            </button>

          </div>

        ) : (

          /* PRODUCTS */

          <div className="space-y-4">

            {wishlist.map((product) => (

              <div
                key={product.id}
                className="bg-white rounded-2xl border border-amber-200 shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition hover:shadow-md"
              >

                {/* IMAGE + PRODUCT INFORMATION */}

                <div className="flex items-center space-x-4 w-full sm:w-auto">

                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-amber-50 border border-amber-100 flex-shrink-0">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  <div className="space-y-1">

                    <p className="text-[10px] uppercase tracking-wider text-amber-700 font-bold">
                      {product.category}
                    </p>

                    <h3 className="text-lg font-serif font-bold text-gray-900">
                      {product.name}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-1">
                      {product.desc}
                    </p>

                    <div className="inline-flex items-center bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                      Starting Price: {product.price}
                    </div>

                  </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-amber-100">

                  <div className="text-right">

                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Starting From
                    </p>

                    <p className="text-lg font-bold text-amber-900">
                      {product.price}
                    </p>

                  </div>


                  {/* BOOK */}

                  <button
                    className="px-4 py-2 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition cursor-pointer"
                  >
                    <span>Book</span>
                    <ArrowRight size={15} />
                  </button>


                  {/* REMOVE */}

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition cursor-pointer shadow-sm"
                    title="Remove from wishlist"
                  >

                    <Heart
                      size={18}
                      fill="currentColor"
                    />

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );

}