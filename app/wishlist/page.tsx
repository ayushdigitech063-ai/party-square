"use client";
import { Heart, ArrowRight, Sparkles } from "lucide-react";
import {useWishlist} from "../context/wishlistcontext";

export default function Wishlist() {
    const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();
  return (
      <section className="min-h-screen bg-[#fbf8f2] px-6 py-12">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-10">

          <p className="mb-3 text-[10px] font-bold tracking-[2.5px] text-[#8b5b17]">
            YOUR COLLECTION
          </p>

          <h1 className="font-serif text-5xl text-[#302823]">
            My{" "}
            <span className="italic text-[#8a1717]">
              Wishlist
            </span>
          </h1>

          <p className="mt-3 text-sm text-[#756d66]">
            Keep your favorite decorations close.
          </p>

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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {wishlist.map((product) => (

              <div
                key={product.id}
                className="overflow-hidden rounded-[22px] border border-[#eadfd5] bg-white shadow-[0_8px_25px_rgba(66,37,22,0.06)]"
              >

                {/* IMAGE */}

                <div className="relative h-[260px]">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />

                  {/* REMOVE HEART */}

                  <button
                    onClick={() =>
                      removeFromWishlist(product.id)
                    }
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#741616] shadow-md"
                  >
                    <Heart
                      size={18}
                      fill="currentColor"
                    />
                  </button>

                </div>


                {/* CONTENT */}

                <div className="p-5">

                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[1.5px] text-[#a02a22]">
                    {product.category}
                  </p>

                  <h2 className="font-serif text-[24px] text-[#302823]">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-[13px] leading-5 text-[#776e66]">
                    {product.description}
                  </p>

                  <div className="my-5 h-px bg-[#eee4dc]" />

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-[10px] text-[#968b82]">
                        Starting from
                      </p>

                      <p className="font-serif text-lg font-semibold text-[#302823]">
                        {product.price}
                      </p>
                    </div>

                    <button className="flex items-center gap-2 rounded-full bg-[#741616] px-5 py-2.5 text-xs font-semibold text-white">
                      Book
                      <ArrowRight size={15} />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}