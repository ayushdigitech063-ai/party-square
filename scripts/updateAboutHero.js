const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/about/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const startMarker = '{/* ================= HERO BANNER ================= */}';
const endMarker = '{/* ================= OUR STORY & VISION';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newHero = `{/* ================= HERO SECTION (MATCHING HOME PAGE BANNER SIZE & CARD STYLE) ================= */}
      <section className="w-full max-w-[1264px] mx-auto p-3 sm:p-4 lg:px-0">
        <div className="relative w-full h-[260px] sm:h-[280px] md:h-[301px] rounded-[20px] sm:rounded-[24px] overflow-hidden text-white shadow-xl flex items-center">
          <div
            className="absolute inset-0 z-0 w-full h-full"
            style={{
              backgroundImage: "url('/home2.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 to-neutral-950/40" />
          <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 md:px-12 w-full text-center sm:text-left">
            <div className="max-w-2xl space-y-1.5 sm:space-y-2">
              <div className="inline-flex items-center space-x-1.5 bg-[#8CBC67]/20 border border-[#8CBC67]/50 px-2.5 sm:px-3.5 py-0.5 rounded-full text-[#8CBC67] text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase backdrop-blur-sm shadow-sm">
                <Sparkles size={12} className="text-[#8CBC67]" />
                <span>Corporate Planner & Events</span>
              </div>
              <h1 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-md">
                <span className="text-white drop-shadow-sm">Corporate Event</span>{' '}
                <span className="text-[#8CBC67] font-bold">Planning & Decor</span>
              </h1>
              <p className="text-neutral-200 text-[11px] sm:text-xs md:text-sm max-w-xl font-light leading-relaxed line-clamp-1 sm:line-clamp-2">
                Discover the philosophy, passion, and meticulous craftsmanship behind Party Square — India&apos;s premier event styling house.
              </p>
              <div className="flex flex-row items-center gap-2 sm:gap-3 pt-1 w-full justify-center sm:justify-start">
                <Link
                  href="/contact"
                  className="bg-[#8CBC67] hover:bg-[#7AB055] text-white px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow-md hover:shadow-[#8CBC67]/30 transition flex items-center justify-center space-x-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Plan Corporate Event</span>
                  <ArrowRight size={13} className="shrink-0" />
                </Link>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/25 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold text-[10px] sm:text-xs uppercase tracking-wider transition flex items-center justify-center space-x-1.5 whitespace-nowrap"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>\n\n      `;

  content = content.substring(0, startIndex) + newHero + content.substring(endIndex);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully aligned about/corporate hero banner!');
} else {
  console.log('Could not find markers');
}
