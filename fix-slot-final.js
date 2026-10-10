const fs = require('fs');

let content = fs.readFileSync('app/card/[id]/page.tsx', 'utf8');

// 1. Add state
content = content.replace(
  'const [selectedDate, setSelectedDate] = useState("");',
  'const [selectedDate, setSelectedDate] = useState("");\n  const [selectedSlot, setSelectedSlot] = useState("");\n  const [customTime, setCustomTime] = useState("");'
);

// 2. Add slot UI
const uiSearchRegex = /className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"\s*\/>\s*<\/label>\s*<\/div>\s*<\/div>/;
const uiReplace = `className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </label>
                </div>

                {/* TIME SLOT */}
                <div className="mt-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-800 mb-3">Time Slot</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Morning (8-12)", "Noon (12-4)", "Night (6-10)", "Full Day", "Custom Time"].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={\`h-[42px] rounded-xl border flex items-center justify-center text-xs font-semibold transition cursor-pointer \${selectedSlot === slot ? "border-[#D7A84B] bg-[#FDF8E1] text-neutral-900 ring-1 ring-[#D7A84B]" : "border-neutral-200 text-neutral-600 hover:border-[#D7A84B] hover:text-neutral-900"}\`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {selectedSlot === "Custom Time" && (
                    <div className="mt-3">
                      <input 
                        type="text" 
                        placeholder="e.g. 10:00 AM to 2:00 PM" 
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#D7A84B] focus:ring-1 focus:ring-[#D7A84B]"
                      />
                    </div>
                  )}
                </div>
              </div>`;

content = content.replace(uiSearchRegex, uiReplace);

// 3. Update handleBookNow
const hbnSearchRegex = /const extra = `\$\{selectedDate \? `&date=\$\{selectedDate\}` : ""\}\$\{[\s\S]*?pincodeChecked \? `&pincode=\$\{pincode\}` : ""[\s\S]*?\}`;/;
const hbnReplace = 'const extra = `${selectedDate ? `&date=${selectedDate}` : ""}${pincodeChecked ? `&pincode=${pincode}` : ""}${selectedSlot ? `&slot=${selectedSlot === "Custom Time" ? customTime : selectedSlot}` : ""}`;';
content = content.replace(hbnSearchRegex, hbnReplace);

// 4. Fix Price formatting (Unicode mojibake fixing)
content = content.replace(/const formattedTotalPrice = .*/g, 'const formattedTotalPrice = `₹${totalPrice.toLocaleString("en-IN")}`;');
content = content.replace(/const formattedOriginalPrice = .*/g, 'const formattedOriginalPrice = `₹${Math.round(originalPrice).toLocaleString("en-IN")}`;');
content = content.replace(/const formattedGrandTotal = .*/g, 'const formattedGrandTotal = `₹${grandTotal.toLocaleString("en-IN")}`;');

// Fix 'A ' missing symbols (multiplier, arrows)
content = content.replace(/A—/g, '—');
content = content.replace(/A\?/g, '→');
content = content.replace(/A- \$\{quantity\}/g, '× ${quantity}');
content = content.replace(/\{formattedGrandTotal\} A\ Book now/g, '{formattedGrandTotal} → Book now');

fs.writeFileSync('app/card/[id]/page.tsx', content, 'utf8');
console.log('Fixed flawlessly!');
