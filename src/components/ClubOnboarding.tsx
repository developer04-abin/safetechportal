import { useState } from 'react';
import { translations, districts, districtMalayalam } from '../utils/translations';
import { FiPlusCircle, FiCheck, FiMap, FiUploadCloud } from 'react-icons/fi';

interface ClubOnboardingProps {
  language: 'en' | 'ml';
}

// Mock active club counts per district
const mockDistrictClubs: Record<string, { total: number; school: number; college: number; lsgd: number }> = {
  "Alappuzha": { total: 18, school: 8, college: 6, lsgd: 4 },
  "Ernakulam": { total: 42, school: 15, college: 18, lsgd: 9 },
  "Idukki": { total: 12, school: 6, college: 3, lsgd: 3 },
  "Kannur": { total: 28, school: 12, college: 10, lsgd: 6 },
  "Kasaragod": { total: 15, school: 7, college: 5, lsgd: 3 },
  "Kollam": { total: 25, school: 11, college: 9, lsgd: 5 },
  "Kottayam": { total: 22, school: 10, college: 8, lsgd: 4 },
  "Kozhikode": { total: 34, school: 14, college: 12, lsgd: 8 },
  "Malappuram": { total: 39, school: 18, college: 13, lsgd: 8 },
  "Palakkad": { total: 26, school: 12, college: 8, lsgd: 6 },
  "Pathanamthitta": { total: 14, school: 6, college: 5, lsgd: 3 },
  "Thiruvananthapuram": { total: 45, school: 18, college: 19, lsgd: 8 },
  "Thrissur": { total: 31, school: 13, college: 11, lsgd: 7 },
  "Wayanad": { total: 11, school: 6, college: 3, lsgd: 2 }
};

// SVG positions for the districts in a stylized narrow strip map
const districtPositions: Record<string, { cy: number; cx: number }> = {
  "Kasaragod": { cy: 40, cx: 80 },
  "Kannur": { cy: 80, cx: 100 },
  "Wayanad": { cy: 110, cx: 160 },
  "Kozhikode": { cy: 140, cx: 120 },
  "Malappuram": { cy: 180, cx: 150 },
  "Palakkad": { cy: 220, cx: 210 },
  "Thrissur": { cy: 260, cx: 180 },
  "Ernakulam": { cy: 300, cx: 160 },
  "Idukki": { cy: 330, cx: 230 },
  "Kottayam": { cy: 360, cx: 180 },
  "Alappuzha": { cy: 390, cx: 140 },
  "Pathanamthitta": { cy: 420, cx: 200 },
  "Kollam": { cy: 450, cx: 180 },
  "Thiruvananthapuram": { cy: 500, cx: 200 }
};

export default function ClubOnboarding({ language }: ClubOnboardingProps) {
  const t = translations[language];

  const [selectedDistrict, setSelectedDistrict] = useState<string>("Thiruvananthapuram");
  const [showRegForm, setShowRegForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form Fields
  const [instName, setInstName] = useState('');
  const [instType, setInstType] = useState('');
  const [coordName, setCoordName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formDistrict, setFormDistrict] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // Simulate upload progress
      setUploadProgress(10);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 25;
        });
      }, 150);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instName || !instType || !coordName || !email || !phone || !formDistrict || !fileName) {
      alert("Please fill all fields and upload the charter document.");
      return;
    }
    setFormSubmitted(true);
    setTimeout(() => {
      // Reset form
      setFormSubmitted(false);
      setShowRegForm(false);
      setInstName('');
      setInstType('');
      setCoordName('');
      setEmail('');
      setPhone('');
      setFormDistrict('');
      setFileName('');
      setUploadProgress(0);
    }, 4000);
  };

  const activeData = mockDistrictClubs[selectedDistrict];

  return (
    <section id="clubs" className="py-20 bg-slate-50 dark:bg-slate-900 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="h2-scale font-space text-3xl font-bold text-slate-900 tracking-tight">
            {t.onboardTitle}
          </h2>
          <p className="text-sm text-slate-500 font-light mt-2">
            {t.onboardSubtitle}
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Map of 14 Districts */}
          <div className="lg:col-span-7 safetech-card p-6 sm:p-8 rounded-3xl bg-white border-slate-200/60 flex flex-col md:flex-row gap-8">
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <h3 className="h3-scale text-lg font-bold font-space text-slate-900 flex items-center gap-2">
                <FiMap className="text-ictak-cyan shrink-0" />
                {t.mapTitle}
              </h3>
              <p className="text-xs text-slate-500 font-light">
                {t.mapHint}
              </p>

              {/* List of Districts for quick selection */}
              <div className="flex flex-wrap md:flex-col gap-1.5 h-48 md:h-[350px] overflow-y-auto pr-2 border-r border-slate-100">
                {districts.map((dist) => (
                  <button
                    key={dist}
                    onClick={() => setSelectedDistrict(dist)}
                    className={`px-3 py-2 rounded-lg text-left text-xs font-semibold font-space transition cursor-pointer flex justify-between items-center ${
                      selectedDistrict === dist
                        ? 'bg-ictak-blue text-white'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{language === 'en' ? dist : districtMalayalam[dist] || dist}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      selectedDistrict === dist ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {mockDistrictClubs[dist]?.total}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stylized schematic Kerala map canvas using SVG */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-slate-50 rounded-2xl p-4 border border-slate-100 relative">
              <svg width="280" height="540" className="max-w-full h-auto">
                {/* Simplified schematic path outline representing coast & land */}
                <path
                  d="M 60 20 L 100 80 L 170 120 L 130 180 L 220 220 L 190 280 L 170 330 L 190 380 L 150 420 L 210 470 L 190 520 L 220 535 L 200 525 L 180 475 L 130 410 L 165 375 L 150 320 L 165 270 L 110 160 L 140 110 L 70 70 Z"
                  fill="rgba(0, 77, 128, 0.03)"
                  stroke="rgba(0, 77, 128, 0.1)"
                  strokeWidth="2"
                />

                {/* Nodes representing the 14 districts */}
                {districts.map((dist) => {
                  const pos = districtPositions[dist] || { cy: 200, cx: 100 };
                  const isSelected = selectedDistrict === dist;
                  return (
                    <g key={dist} className="cursor-pointer" onClick={() => setSelectedDistrict(dist)}>
                      <circle
                        cx={pos.cx}
                        cy={pos.cy}
                        r={isSelected ? 10 : 6}
                        className={`transition-all duration-300 ${
                          isSelected 
                            ? 'fill-ictak-cyan stroke-white stroke-[3px] filter drop-shadow-md' 
                            : 'fill-ictak-blue hover:fill-ictak-cyan'
                        }`}
                      />
                      {/* Tooltip Labels on Map for top visual details */}
                      {isSelected && (
                        <g>
                          <rect
                            x={pos.cx - 50}
                            y={pos.cy - 35}
                            width="100"
                            height="22"
                            rx="5"
                            fill="#004d80"
                          />
                          <text
                            x={pos.cx}
                            y={pos.cy - 20}
                            fill="#ffffff"
                            fontSize="9"
                            fontFamily="Space Grotesk, sans-serif"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            {language === 'en' ? dist : districtMalayalam[dist]}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Right Column: Dynamic Statistics Card & Form Trigger */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            
            {/* Live stats for the selected district */}
            <div className="safetech-card p-6 sm:p-8 rounded-3xl bg-white border-slate-200/60 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-space font-bold uppercase tracking-wider text-ictak-cyan">
                  {t.activeClubsIn}
                </span>
                <h3 className="h3-scale text-2xl font-bold font-space text-slate-900 mt-1">
                  {language === 'en' ? selectedDistrict : districtMalayalam[selectedDistrict]}
                </h3>

                <div className="grid grid-cols-3 gap-3 mt-6 border-t border-slate-100 pt-6">
                  <div className="flex flex-col p-3 bg-slate-50 rounded-xl text-center">
                    <span className="text-xs font-semibold text-slate-500">{t.school}</span>
                    <span className="text-xl font-bold text-slate-800 mt-1">{activeData?.school}</span>
                  </div>
                  <div className="flex flex-col p-3 bg-slate-50 rounded-xl text-center">
                    <span className="text-xs font-semibold text-slate-500">{t.college}</span>
                    <span className="text-xl font-bold text-slate-800 mt-1">{activeData?.college}</span>
                  </div>
                  <div className="flex flex-col p-3 bg-slate-50 rounded-xl text-center">
                    <span className="text-xs font-semibold text-slate-500">LSGD</span>
                    <span className="text-xl font-bold text-slate-800 mt-1">{activeData?.lsgd}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-ictak-blue/5 p-4 rounded-xl border border-ictak-blue/10 mt-6">
                  <span className="text-xs font-space font-bold text-ictak-blue uppercase">Total Clubs</span>
                  <span className="text-2xl font-extrabold text-ictak-blue font-space">{activeData?.total}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setFormDistrict(selectedDistrict);
                  setShowRegForm(true);
                }}
                className="w-full mt-6 py-3 rounded-xl bg-ictak-blue hover:bg-ictak-blue/90 text-white font-space font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <FiPlusCircle />
                {t.registerClub}
              </button>
            </div>

            {/* Quick Informational Box */}
            <div className="p-5 rounded-2xl bg-ictak-cyan/5 border border-ictak-cyan/15 text-xs text-slate-600 leading-relaxed text-left flex flex-col gap-2">
              <span className="font-bold text-ictak-blue uppercase font-space tracking-wider">Club Mandate</span>
              <p>
                To form a SafeTech club, download the official campaign charter, get it signed by the Head of Institution, and upload it during registration. All clubs are assigned a dedicated PMU advisor.
              </p>
            </div>

          </div>
        </div>

        {/* Club Registration Modal Backdrop */}
        {showRegForm && (
          <div className="fixed inset-0 z-[50] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative bg-white dark:bg-slate-900 max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl max-h-[90vh] overflow-y-auto">
              
              <div className="flex justify-between items-start mb-6">
                <h3 className="h3-scale text-xl font-bold font-space text-slate-900">
                  {t.registerClub}
                </h3>
                <button
                  onClick={() => setShowRegForm(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 font-bold font-space text-base cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-left">
                  
                  {/* Inst Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-500 font-space">{t.instName}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Govt Model Higher Secondary School"
                      value={instName}
                      onChange={(e) => setInstName(e.target.value)}
                      className="px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-ictak-cyan text-slate-950"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Inst Type */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase text-slate-500 font-space">{t.instType}</label>
                      <select
                        required
                        value={instType}
                        onChange={(e) => setInstType(e.target.value)}
                        className="px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-ictak-cyan text-slate-950 cursor-pointer"
                      >
                        <option value="">{t.selectType}</option>
                        <option value="school">{t.school}</option>
                        <option value="college">{t.college}</option>
                        <option value="lsgd">{t.lsgd}</option>
                      </select>
                    </div>

                    {/* District */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase text-slate-500 font-space">{t.district}</label>
                      <select
                        required
                        value={formDistrict}
                        onChange={(e) => setFormDistrict(e.target.value)}
                        className="px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-ictak-cyan text-slate-950 cursor-pointer"
                      >
                        <option value="">{t.district}</option>
                        {districts.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Coordinator */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-500 font-space">{t.coordName}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prof. Joseph Kurian"
                      value={coordName}
                      onChange={(e) => setCoordName(e.target.value)}
                      className="px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-ictak-cyan text-slate-950"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase text-slate-500 font-space">{t.email}</label>
                      <input
                        type="email"
                        required
                        placeholder="coord@school.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-ictak-cyan text-slate-950"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase text-slate-500 font-space">{t.phone}</label>
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-ictak-cyan text-slate-950"
                      />
                    </div>
                  </div>

                  {/* File Upload Zone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase text-slate-500 font-space">{t.uploadMandate}</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-50 hover:border-ictak-cyan transition relative cursor-pointer">
                      <input
                        type="file"
                        required
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <FiUploadCloud className="text-3xl text-slate-400" />
                        <span className="text-xs text-slate-700 font-semibold">{t.uploadHint}</span>
                      </div>
                    </div>

                    {fileName && (
                      <div className="mt-2 p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs">
                        <span className="text-slate-700 truncate max-w-xs">{fileName}</span>
                        {uploadProgress < 100 ? (
                          <span className="text-ictak-cyan font-bold font-mono">{uploadProgress}%</span>
                        ) : (
                          <span className="text-green-500 font-bold flex items-center gap-1">
                            <FiCheck /> Complete
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3.5 bg-ictak-blue hover:bg-ictak-blue/90 text-white rounded-xl font-space font-bold uppercase text-xs sm:text-sm tracking-wider cursor-pointer shadow-sm"
                  >
                    {t.submitClub}
                  </button>

                </form>
              ) : (
                /* Submission Success */
                <div className="flex flex-col items-center text-center gap-6 py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center text-3xl">
                    <FiCheck />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="font-bold text-lg text-slate-900 font-space">{t.clubSuccess}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      {language === 'en' 
                        ? 'We are validating your charter. Your Coordinator will receive login credentials on their email within 2-3 business days.' 
                        : 'നിങ്ങൾ സമർപ്പിച്ച രേഖകൾ ഞങ്ങൾ പരിശോധിച്ചുവരികയാണ്. രണ്ട് പ്രവൃത്തി ദിവസങ്ങൾക്കുള്ളിൽ ഇമെയിൽ വഴി കോർഡിനേറ്റർക്ക് വിവരങ്ങൾ ലഭിക്കുന്നതാണ്.'}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
