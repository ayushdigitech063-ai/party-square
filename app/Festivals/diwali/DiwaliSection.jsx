import React from 'react';

export default function DiwaliSection() {
  return (
    <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold tracking-wider uppercase text-sm bg-amber-100 px-3 py-1 rounded-full">
            Festival of Lights
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-3 sm:text-5xl font-serif">
            Celebrate the Radiance of <span className="text-amber-600">Diwali</span>
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-200/60 transition-all duration-300 hover:shadow-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            
            {/* Left Side: Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full h-[350px] sm:h-[420px] rounded-2xl overflow-hidden shadow-lg border-4 border-amber-100 group">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMKZDvwdiPt_2zJF57OoFuSblsrmbYHFFdstzLpJk8Pw&s=10" 
                  alt="Diwali Celebration" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                <span className="absolute bottom-4 left-4 text-white font-medium text-sm bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm">
                  ✨ Shubh Deepawali
                </span>
              </div>
            </div>

            {/* Right Side: Long & Attractive Content */}
            <div className="lg:col-span-7 space-y-6 text-gray-700">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">
                The Dawn of Light, The Destruction of Darkness
              </h3>
              
              <p className="leading-relaxed text-base sm:text-lg">
                Diwali is a wonderful festival of earth, water, and light that spreads happiness, enthusiasm, and new hopes all around the world. It is not just about lighting diyas, but a festival to dispel ego, ignorance, and negativity hidden within us and ignite the flame of knowledge.
              </p>

              <div className="space-y-4 border-l-4 border-amber-500 pl-4 my-4 italic text-gray-600">
                <p>
                  "The light of the lamp teaches us that no matter how deep the darkness is, even a small flame has the power to illuminate an entire room."
                </p>
              </div>

              <p className="leading-relaxed text-base">
                On this auspicious occasion, the cleaning of homes, the beautiful art of rangoli, and the sweet fragrance of sweets fill every heart with unique energy. All family members come together to worship Lakshmi-Ganesh, pray for prosperity, and embrace each other to share love.
              </p>

              {/* Highlights Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3 bg-amber-50/60 p-3 rounded-xl border border-amber-100">
                  <span className="text-xl">🪔</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Deepotsav</h4>
                    <p className="text-sm text-gray-600">Decorating every corner of the house with lamps.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-amber-50/60 p-3 rounded-xl border border-amber-100">
                  <span className="text-xl">🍬</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sweets & Gifts</h4>
                    <p className="text-sm text-gray-600">Spreading sweetness and love in relationships.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium px-8 py-3 rounded-xl shadow-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:-translate-y-0.5">
                  Explore Celebrations
                </button>
                <button className="border-2 border-amber-500 text-amber-700 font-medium px-6 py-3 rounded-xl hover:bg-amber-50 transition-all duration-300">
                  Send Wishes
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}