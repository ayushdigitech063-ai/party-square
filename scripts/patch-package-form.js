const fs = require('fs');
const file = 'c:/party-square/party-square/app/admin/packages/page.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('formPincodes')) {
  // 1. Add state in page.tsx
  content = content.replace(
    'const [formFeatures, setFormFeatures] = useState("");',
    `const [formFeatures, setFormFeatures] = useState("");
  const [formPincodes, setFormPincodes] = useState("");`
  );

  // 2. Clear in handleOpenCreate
  content = content.replace(
    'setFormFeatures("");\n    setIsModalOpen(true);',
    'setFormFeatures("");\n    setFormPincodes("");\n    setIsModalOpen(true);'
  );

  // 3. Populate in handleOpenEdit
  content = content.replace(
    'setFormFeatures((pkg.features || []).join("\\n"));\n    setIsModalOpen(true);',
    'setFormFeatures((pkg.features || []).join("\\n"));\n    setFormPincodes(((pkg as any).serviceablePincodes || []).join(", "));\n    setIsModalOpen(true);'
  );

  // 4. Add to payload in handleSubmit
  content = content.replace(
    'features: featuresList,',
    `features: featuresList,
      serviceablePincodes: formPincodes
        .split(/[\\n,]+/)
        .map((p) => p.trim())
        .filter((p) => /^\\d{6}$/.test(p)),`
  );

  // 5. Add UI in Modal before Popular switch
  const targetPopularDiv = '              {/* Popular Switch */}';
  const pincodeUI = `              {/* Serviceable Pincodes (Optional) */}
              <div>
                <label className="block text-[#202522] font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                  Serviceable Pincodes (Optional - Comma separated)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 302001, 302015, 302020 or leave blank to serve all areas"
                  value={formPincodes}
                  onChange={(e) => setFormPincodes(e.target.value)}
                  className="w-full px-4 py-2 text-xs rounded-xl border border-[#E8E8E3] bg-[#FCFBF7] text-[#202522] focus:outline-none focus:border-[#8CBC67] font-mono"
                />
                <span className="text-[10px] text-[#6B706C] mt-1 block">
                  Leave empty to allow this package in all pincodes of the selected city.
                </span>
              </div>

              {/* Popular Switch */}`;

  content = content.replace(targetPopularDiv, pincodeUI);
  fs.writeFileSync(file, content, 'utf8');
  console.log('packages/page.tsx updated with Serviceable Pincodes');
} else {
  console.log('packages/page.tsx already has formPincodes');
}
