
const fs = require('fs');
let c = fs.readFileSync('app/card/[id]/page.tsx', 'utf8');

c = c.replace('const [selectedDate, setSelectedDate] = useState("");', 'const [selectedDate, setSelectedDate] = useState("");\n  const [selectedSlot, setSelectedSlot] = useState("");\n  const [customTime, setCustomTime] = useState("");');

const uiSearch = 'className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"\\r\\n                    />\\r\\n                  </label>\\r\\n                </div>\\r\\n              </div>';
const uiReplace = 'className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"\\n                    />\\n                  </label>\\n                </div>\\n\\n                {/* TIME SLOT */}\\n                <div className="mt-5">\\n                  <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-800 mb-3">Time Slot</p>\\n                  <div className="grid grid-cols-2 gap-2">\\n                    {["Morning (8-12)", "Noon (12-4)", "Night (6-10)", "Full Day", "Custom Time"].map((slot) => (\\n                      <button\\n                        key={slot}\\n                        type="button"\\n                        onClick={() => setSelectedSlot(slot)}\\n                        className={\\h-[42px] rounded-xl border flex items-center justify-center text-xs font-semibold transition cursor-pointer \\\\}\\n                      >\\n                        {slot}\\n                      </button>\\n                    ))}\\n                  </div>\\n                  {selectedSlot === "Custom Time" && (\\n                    <div className="mt-3">\\n                      <input \\n                        type="text" \\n                        placeholder="e.g. 10:00 AM to 2:00 PM" \\n                        value={customTime}\\n                        onChange={(e) => setCustomTime(e.target.value)}\\n                        className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-[#D7A84B] focus:ring-1 focus:ring-[#D7A84B]"\\n                      />\\n                    </div>\\n                  )}\\n                </div>\\n              </div>';

c = c.replace(uiSearch, uiReplace);

const hbnSearch = 'const extra = \\\\$\\{selectedDate ? \\&date=\\$\\{selectedDate\\}\\ : \\\\\\}\\$\\{\\n      pincodeChecked ? \\&pincode=\\$\\{pincode\\}\\ : \\\\\\n    \\}\\;';
const hbnReplace = 'const extra = \\\\$\\{selectedDate ? \\&date=\\$\\{selectedDate\\}\\ : \\\\\\}\\$\\{pincodeChecked ? \\&pincode=\\$\\{pincode\\}\\ : \\\\\\}\\$\\{selectedSlot ? \\&slot=\\$\\{selectedSlot === \\Custom Time\\ ? customTime : selectedSlot\\}\\ : \\\\\\}\\;';

c = c.replace(hbnSearch, hbnReplace);

c = c.replace(/â‚¹/g, '?');
c = c.replace(/,1/g, '?');
c = c.replace(/A—/g, '—');
c = c.replace(/A\?/g, '?');
c = c.replace(/A-/g, '×');

fs.writeFileSync('app/card/[id]/page.tsx', c, 'utf8');
console.log('Fixed');

