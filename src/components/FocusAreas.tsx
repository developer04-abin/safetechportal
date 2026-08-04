import { useState } from 'react';
import { translations } from '../utils/translations';
import { 
  FiShield, FiDollarSign, FiSmile, 
  FiFileText, FiLock, FiBookOpen 
} from 'react-icons/fi';

interface FocusAreasProps {
  language: 'en' | 'ml';
}

export default function FocusAreas({ language }: FocusAreasProps) {
  const t = translations[language];
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null);

  const themes = [
    {
      id: 1,
      title: t.theme1Title,
      description: t.theme1Desc,
      details: t.theme1Details,
      icon: FiShield,
      color: "text-ictak-blue bg-ictak-blue/5 border-ictak-blue/10",
      tips: language === 'en' 
        ? ["Use different passwords for all accounts", "Enable 2-factor authentication", "Update apps and operating systems immediately", "Avoid sharing sensitive details on public networks"] 
        : ["എല്ലാ അക്കൗണ്ടുകൾക്കും വ്യത്യസ്ത പാസ്‌വേഡുകൾ ഉപയോഗിക്കുക", "2-ഫാക്ടർ പ്രാമാണീകരണം പ്രവർത്തനക്ഷമമാക്കുക", "ഡിവൈസുകൾ കൃത്യമായി അപ്‌ഡേറ്റ് ചെയ്യുക", "പൊതു നെറ്റ്‌വർക്കുകളിൽ പ്രധാന വിവരങ്ങൾ കൈമാറരുത്"]
    },
    {
      id: 2,
      title: t.theme2Title,
      description: t.theme2Desc,
      details: t.theme2Details,
      icon: FiDollarSign,
      color: "text-ictak-cyan bg-ictak-cyan/5 border-ictak-cyan/10",
      tips: language === 'en' 
        ? ["Never share bank OTPs or PINs with anyone", "Avoid clicking on link-based lottery winning SMS", "Report transactions fraud to 1930 within the first hour", "Verify UPI ID before typing payment PIN"]
        : ["ബാങ്ക് OTP അല്ലെങ്കിൽ PIN ആരുമായും പങ്കിടരുത്", "ലോട്ടറി അടിച്ചതായുള്ള വ്യാജ സന്ദേശങ്ങളിലെ ലിങ്കുകളിൽ ക്ലിക്ക് ചെയ്യരുത്", "തട്ടിപ്പ് നടന്നാൽ ആദ്യ ഒരു മണിക്കൂറിനുള്ളിൽ 1930-ൽ അറിയിക്കുക", "UPI ഐഡി ശരിയാണെന്ന് ഉറപ്പാക്കിയ ശേഷം മാത്രം പിൻ നൽകുക"]
    },
    {
      id: 3,
      title: t.theme3Title,
      description: t.theme3Desc,
      details: t.theme3Details,
      icon: FiSmile,
      color: "text-green-600 bg-green-50 border-green-100",
      tips: language === 'en' 
        ? ["Set screen time limits for apps", "Avoid using digital devices 1 hour before sleep", "Support friends facing online harassment/cyberbullying", "Seek counseling if experiencing digital burnout"]
        : ["ആപ്പുകൾക്കായി സ്ക്രീൻ സമയ പരിധി നിശ്ചയിക്കുക", "ഉറങ്ങുന്നതിന് 1 മണിക്കൂർ മുമ്പ് സ്ക്രീനുകൾ ഒഴിവാക്കുക", "ഓൺലൈൻ പീഡനം നേരിടുന്ന സുഹൃത്തുക്കളെ സഹായിക്കുക", "ഡിജിറ്റൽ ബേൺഔട്ട് അനുഭവപ്പെടുന്നുണ്ടെങ്കിൽ കൗൺസിലിംഗ് തേടുക"]
    },
    {
      id: 4,
      title: t.theme4Title,
      description: t.theme4Desc,
      details: t.theme4Details,
      icon: FiFileText,
      color: "text-purple-600 bg-purple-50 border-purple-100",
      tips: language === 'en' 
        ? ["Fact-check viral WhatsApp messages before forwarding", "Verify news on official government portals (e.g. PIB)", "Check domain names of sources to ensure validity", "Avoid sensationalist titles that provoke panic"]
        : ["വാട്സാപ്പ് സന്ദേശങ്ങൾ ഫോർവേഡ് ചെയ്യുന്നതിന് മുമ്പ് വസ്തുത പരിശോധിക്കുക", "ഔദ്യോഗിക സർക്കാർ പോർട്ടലുകൾ വഴി വിവരങ്ങൾ സ്ഥിരീകരിക്കുക", "വാർത്തകളുടെ വെബ്സൈറ്റ് വിലാസം ശരിയാണോ എന്ന് പരിശോധിക്കുക", "ഭീതി പരത്തുന്ന തരത്തിലുള്ള തലക്കെട്ടുകൾ വിശ്വസിക്കരുത്"]
    },
    {
      id: 5,
      title: t.theme5Title,
      description: t.theme5Desc,
      details: t.theme5Details,
      icon: FiLock,
      color: "text-orange-600 bg-orange-50 border-orange-100",
      tips: language === 'en' 
        ? ["Read and review camera/location permissions in apps", "Decline non-essential cookie permissions", "You have the right to erase collected data under DPDP", "Secure cloud storage with strong password keys"]
        : ["ആപ്പുകൾക്ക് നൽകുന്ന ക്യാമറ/ലൊക്കേഷൻ അനുമതികൾ പരിശോധിക്കുക", "ആവശ്യമില്ലാത്ത കുക്കികൾ ഒഴിവാക്കുക", "DPDP പ്രകാരം വിവരങ്ങൾ നീക്കം ചെയ്യാനുള്ള അവകാശം ഉപയോഗിക്കുക", "ക്ലൗഡ് സ്റ്റോറേജുകൾ ശക്തമായ പാസ്‌വേഡുകൾ ഉപയോഗിച്ച് സുരക്ഷിതമാക്കുക"]
    },
    {
      id: 6,
      title: t.theme6Title,
      description: t.theme6Desc,
      details: t.theme6Details,
      icon: FiBookOpen,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
      tips: language === 'en' 
        ? ["Identity theft and impersonation are crimes under IT Act Sec 66C", "Online stalking carries strict prison terms", "Register complaints at cybercrime.gov.in official portal", "Keep digital logs/screenshots as legal evidence"]
        : ["ഐഡന്റിറ്റി മോഷണവും വ്യാജപ്രൊഫൈലുകളും ഐടി ആക്ട് 66C പ്രകാരം കുറ്റകരമാണ്", "ഓൺലൈൻ സ്റ്റാക്കിംഗിന് കർശനമായ തടവുശിക്ഷയുണ്ട്", "cybercrime.gov.in വഴി നേരിട്ട് പരാതി രജിസ്റ്റർ ചെയ്യാം", "തെളിവുകൾക്കായി സ്ക്രീൻഷോട്ടുകളും ഡിജിറ്റൽ ലോഗുകളും സൂക്ഷിക്കുക"]
    },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-[#08080f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="h2-scale font-space text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {t.themesTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-light mt-2 max-w-xl mx-auto">
            {t.themesSubtitle}
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme) => {
            const Icon = theme.icon;
            const isSelected = selectedTheme === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => setSelectedTheme(isSelected ? null : theme.id)}
                className={`safetech-card p-6 rounded-2xl cursor-pointer flex flex-col justify-between border-slate-200/60 relative overflow-hidden ${
                  isSelected ? 'ring-2 ring-ictak-cyan bg-slate-50/50' : ''
                }`}
              >
                <div>
                  <div className={`p-3 rounded-xl inline-flex ${theme.color} border mb-5`}>
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="h3-scale text-lg font-bold text-slate-900 font-space mb-2">
                    {theme.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                    {theme.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-ictak-blue font-bold font-space">
                  <span>{language === 'en' ? 'Click to inspect guidelines' : 'മാർഗ്ഗനിർദ്ദേശങ്ങൾ കാണുക'}</span>
                  <span>{isSelected ? '▲' : '▼'}</span>
                </div>

                {/* Expandable checklist inside card */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-slate-200 text-left bg-slate-50 p-4 rounded-xl">
                    <p className="text-xs text-slate-700 font-bold mb-2">
                      {theme.details}
                    </p>
                    <ul className="list-disc pl-4 text-xs text-slate-600 font-light flex flex-col gap-1.5 mt-2">
                      {theme.tips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
