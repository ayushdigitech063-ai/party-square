const fs = require('fs');
const file = 'c:/party-square/party-square/app/admin/products/ProductForm.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add serviceablePincodes state
if (!content.includes('serviceablePincodes')) {
  content = content.replace(
    'const [availableCities, setAvailableCities] = useState<string[]>(\n    initialData?.availableCities || []\n  );',
    `const [availableCities, setAvailableCities] = useState<string[]>(
    initialData?.availableCities || []
  );

  // Serviceable Pincodes (comma or newline separated list)
  const [serviceablePincodesInput, setServiceablePincodesInput] = useState<string>(
    Array.isArray((initialData as any)?.serviceablePincodes)
      ? ((initialData as any).serviceablePincodes || []).join(", ")
      : ""
  );`
  );

  // 2. Add to payload in handleSubmit
  content = content.replace(
    'availableCities,',
    `availableCities,
        serviceablePincodes: serviceablePincodesInput
          .split(/[\\n,]+/)
          .map((p) => p.trim())
          .filter((p) => /^\\d{6}$/.test(p)),`
  );

  // 3. Add UI Section right below Available Cities section
  const targetClosingDiv = '              </div>\n            )}\n          </div>';
  const pincodeUI = `              </div>
            )}
          </div>

          {/* SERVICEABLE PINCODES SECTION */}
          <div className="bg-white rounded-2xl border border-[#E8E8E3] p-5 shadow-xs space-y-4">
            <div>
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-[#8CBC67]" />
                <h3 className="font-serif font-bold text-lg text-[#202522]">
                  Serviceable Pincodes (Optional)
                </h3>
              </div>
              <p className="text-xs text-[#6B706C] mt-1">
                Restrict this product to specific 6-digit delivery pincodes. If left empty, this product is available for booking in all areas of the selected cities.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#202522] uppercase tracking-wider mb-1.5">
                Pincodes (Comma or line separated)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. 302001, 302015, 302020 or paste a list of 6-digit pincodes"
                value={serviceablePincodesInput}
                onChange={(e) => setServiceablePincodesInput(e.target.value)}
                className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] focus:outline-none focus:border-[#8CBC67] font-mono leading-relaxed"
              />
              <div className="flex items-center justify-between text-[11px] text-[#6B706C] mt-1.5">
                <span>
                  Valid 6-digit pincodes detected:{" "}
                  <strong className="text-[#202522]">
                    {
                      serviceablePincodesInput
                        .split(/[\\n,]+/)
                        .map((p) => p.trim())
                        .filter((p) => /^\\d{6}$/.test(p)).length
                    }
                  </strong>
                </span>
                <span className="text-neutral-400">Leave blank to allow all pincodes</span>
              </div>
            </div>
          </div>`;

  content = content.replace(targetClosingDiv, pincodeUI);
  fs.writeFileSync(file, content, 'utf8');
  console.log('ProductForm.tsx updated with Serviceable Pincodes');
} else {
  console.log('ProductForm.tsx already has serviceablePincodes');
}
