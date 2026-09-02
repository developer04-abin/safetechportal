import { useState, useRef } from 'react';
import { translations, districts } from '../utils/translations';
import { FiCheckCircle, FiDownload, FiInfo, FiShield } from 'react-icons/fi';

interface PledgeProps {
  language: 'en' | 'ml';
  onPledgeTaken: () => void;
}

export default function Pledge({ language, onPledgeTaken }: PledgeProps) {
  const t = translations[language];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [name, setName] = useState('');
  const [district, setDistrict] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [consent, setConsent] = useState(false);
  const [hasPledged, setHasPledged] = useState(false);
  const [certUrl, setCertUrl] = useState('');
  const [certId, setCertId] = useState('');

  const handleTakePledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !district || !consent) return;

    // Simple validation for email and mobile
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(email)) {
      alert(language === 'en' ? 'Please enter a valid email address.' : 'ദയവായി സാധുവായ ഇമെയിൽ വിലാസം നൽകുക.');
      return;
    }

    if (!mobileRegex.test(mobile)) {
      alert(language === 'en' ? 'Please enter a valid 10-digit mobile number.' : 'ദയവായി സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.');
      return;
    }

    // Generate unique certificate ID
    const uniqueId = `ST-${Math.floor(100000 + Math.random() * 900000)}`;
    setCertId(uniqueId);
    setHasPledged(true);
    onPledgeTaken();

    // Trigger canvas draw after short render delay
    setTimeout(() => {
      drawCertificate(name.trim(), district, uniqueId);
    }, 100);
  };

  const drawCertificate = (userName: string, userDistrict: string, uniqueId: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background Gradient (Premium Light Theme)
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(1, '#f1f5f9');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border (ICTAK Blue & Cyan)
    ctx.strokeStyle = '#004d80';
    ctx.lineWidth = 20;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    ctx.strokeStyle = '#00b4d8';
    ctx.lineWidth = 4;
    ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50);

    // Decorative corner markers
    ctx.fillStyle = '#004d80';
    ctx.fillRect(20, 20, 40, 40);
    ctx.fillRect(canvas.width - 60, 20, 40, 40);
    ctx.fillRect(20, canvas.height - 60, 40, 40);
    ctx.fillRect(canvas.width - 60, canvas.height - 60, 40, 40);

    // Badge Title Text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#004d80';
    ctx.font = 'bold 24px Poppins, Inter, sans-serif';
    ctx.fillText('SAFETECH KERALA CAMPAIGN', canvas.width / 2, 80);

    ctx.fillStyle = '#64748b';
    ctx.font = 'italic 16px Inter, sans-serif';
    ctx.fillText('Statewide Digital Security Mission', canvas.width / 2, 105);

    // Certificate Label
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 32px Poppins, sans-serif';
    ctx.fillText('CERTIFICATE OF COMMITMENT', canvas.width / 2, 170);

    ctx.fillStyle = '#475569';
    ctx.font = '16px Inter, sans-serif';
    ctx.fillText('This is to certify that', canvas.width / 2, 215);

    // User Name (Highlighted in Cyan/Blue)
    ctx.fillStyle = '#00b4d8';
    ctx.font = 'bold 36px Poppins, sans-serif';
    ctx.fillText(userName.toUpperCase(), canvas.width / 2, 270);

    // Line under name
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 180, 285);
    ctx.lineTo(canvas.width / 2 + 180, 285);
    ctx.stroke();

    // Core Commitment Paragraph
    ctx.fillStyle = '#475569';
    ctx.font = '15px Inter, sans-serif';
    ctx.fillText(`from ${userDistrict} District has taken the SafeTech Pledge`, canvas.width / 2, 315);
    ctx.fillText('committing to be a responsible, ethical, and safe digital citizen,', canvas.width / 2, 340);
    ctx.fillText('protecting personal data, and helping to combat cyber threats.', canvas.width / 2, 365);

    // Signature Seals & logos representation
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText('ICTAK - KSITM - Cyberdome Joint Seal', canvas.width / 2, 430);

    // Signature lines
    ctx.strokeStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(100, 480); ctx.lineTo(250, 480);
    ctx.moveTo(550, 480); ctx.lineTo(700, 480);
    ctx.stroke();

    ctx.fillStyle = '#475569';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText('Campaign Coordinator', 175, 495);
    ctx.fillText('Cyber Security Expert', 625, 495);

    // Date
    const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText(`Date: ${today}`, canvas.width / 2, 510);

    // Unique Certificate hash ID at bottom right
    ctx.textAlign = 'right';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px monospace';
    ctx.fillText(`Certificate ID: ${uniqueId}`, canvas.width - 40, canvas.height - 35);

    // Set download URL
    const url = canvas.toDataURL('image/png');
    setCertUrl(url);
  };

  return (
    <section id="pledge-section" className="py-20 lg:py-24 bg-white dark:bg-[#06060c] border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ictak-cyan/10 border border-ictak-cyan/20 text-ictak-cyan text-[11px] font-space font-bold uppercase tracking-wider mb-3">
            <FiShield />
            <span>Civic Commitment</span>
          </div>
          <h2 className="h2-scale font-space text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t.pledgeTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light mt-2 max-w-xl mx-auto leading-relaxed">
            {t.pledgeSubtitle}
          </p>
        </div>

        {/* Content Container */}
        <div className="safetech-card p-6 sm:p-10 rounded-3xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
          {!hasPledged ? (
            <form onSubmit={handleTakePledge} className="flex flex-col gap-6 text-left">
              
              {/* Row 1: Name and District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name-input" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 font-space">
                    {t.pledgeNameLabel}
                  </label>
                  <input
                    type="text"
                    id="name-input"
                    required
                    placeholder={t.pledgeNamePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-ictak-cyan w-full text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>

                {/* District Select */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="district-select" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 font-space">
                    {t.pledgeDistrictLabel}
                  </label>
                  <select
                    id="district-select"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-ictak-cyan w-full text-slate-900 dark:text-white cursor-pointer"
                  >
                    <option value="" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                      {language === 'en' ? '-- Select District --' : '-- ജില്ല തിരഞ്ഞെടുക്കുക --'}
                    </option>
                    {districts.map((dist) => (
                      <option key={dist} value={dist} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Email and Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email-input" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 font-space">
                    {language === 'en' ? 'Email Address' : 'ഇമെയിൽ വിലാസം'}
                  </label>
                  <input
                    type="email"
                    id="email-input"
                    required
                    placeholder={language === 'en' ? 'Enter your email' : 'ഇമെയിൽ നൽകുക'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-ictak-cyan w-full text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>

                {/* Mobile Number Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="mobile-input" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 font-space">
                    {language === 'en' ? 'Mobile Number' : 'മൊബൈൽ നമ്പർ'}
                  </label>
                  <input
                    type="tel"
                    id="mobile-input"
                    required
                    pattern="[0-9]{10}"
                    placeholder={language === 'en' ? '10-digit mobile number' : '10 അക്ക മൊബൈൽ നമ്പർ'}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="px-4 py-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-ictak-cyan w-full text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* DPDP Compliance Checkbox */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 mt-2">
                <input
                  type="checkbox"
                  id="consent-check"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 text-ictak-blue border-slate-300 dark:border-slate-600 rounded focus:ring-ictak-cyan cursor-pointer"
                />
                <div className="flex flex-col">
                  <label htmlFor="consent-check" className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium cursor-pointer">
                    {t.pledgeConsent}
                  </label>
                  <span className="text-[10px] text-slate-400 dark:text-slate-400 font-light mt-1 flex items-center gap-1">
                    <FiInfo className="text-xs shrink-0 text-slate-500 dark:text-slate-400" />
                    DPDP Act Compliance: We only store minimal fields for generating certificates. No data sells or shares.
                  </span>
                </div>
              </div>

              {/* Pledge Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl text-sm font-space font-bold uppercase tracking-wider text-white bg-gradient-to-r from-ictak-blue to-ictak-cyan hover:opacity-95 shadow-md cursor-pointer mt-4 transition"
              >
                {t.pledgeButton}
              </button>

            </form>
          ) : (
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-3xl">
                <FiCheckCircle />
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="h3-scale text-xl font-bold font-space text-slate-900 dark:text-white">
                  {t.pledgeSuccess}
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  Certificate Hash: {certId}
                </span>
              </div>

              {/* Certificate Download Panel */}
              <div className="w-full max-w-lg border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-900 p-4">
                {/* Responsive View of Certificate */}
                <div className="aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center rounded-xl overflow-hidden relative border border-slate-200 dark:border-slate-700">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex gap-4 mt-4">
                  <a
                    href={certUrl}
                    download={`SafeTech_Certificate_${name.replace(/\s+/g, '_')}.png`}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-ictak-blue to-ictak-cyan hover:opacity-95 text-white font-space font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm transition"
                  >
                    <FiDownload />
                    {t.downloadCertificate}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
