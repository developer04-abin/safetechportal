import MarqueeComponent from 'react-fast-marquee';
import { BsMegaphone } from 'react-icons/bs';

const Marquee = (MarqueeComponent as any).default || MarqueeComponent;

interface MarqueueProps {
  language: 'en' | 'ml';
}

const alertsEn = [
  "🚨 Alert: Never share bank OTP, PIN, or password with anyone. Call 1930 immediately for financial fraud.",
  "📢 Info: SafeTech Club registrations are now open for Schools and Colleges across all 14 districts.",
  "💡 Tip: Secure your social media accounts with Multi-Factor Authentication (MFA).",
  "🛡️ Campaign: Join thousands of citizens taking the Digital Responsibility Pledge today!",
  "📞 Cyber Help: Reporting within the 'golden hour' (first 1 hour) yields maximum recovery rates for online thefts."
];

const alertsMl = [
  "🚨 മുന്നറിയിപ്പ്: ഒടിപി, പിൻ അല്ലെങ്കിൽ രഹസ്യ ബാങ്ക് വിവരങ്ങൾ ആരുമായും പങ്കിടരുത്. തട്ടിപ്പുണ്ടായാൽ ഉടൻ 1930 വിളിക്കുക.",
  "📢 അറിയിപ്പ്: സംസ്ഥാനത്തെ സ്കൂളുകൾക്കും കോളേജുകൾക്കുമായി സേഫ്ടെക് ക്ലബ് രജിസ്ട്രേഷൻ ആരംഭിച്ചു.",
  "💡 ടിപ്പ്: സോഷ്യൽ മീഡിയ അക്കൗണ്ടുകൾ സുരക്ഷിതമാക്കാൻ മൾട്ടി-ഫാക്ടർ ഓഥന്റിക്കേഷൻ (MFA) ഉപയോഗിക്കുക.",
  "🛡️ കാമ്പയിൻ: ഡിജിറ്റൽ പ്രതിജ്ഞയെടുക്കുന്ന പതിനായിരക്കണക്കിന് പൗരന്മാർക്കൊപ്പം ഇന്ന് തന്നെ പങ്കാളിയാകൂ!",
  "📞 സൈബർ സഹായം: പണം നഷ്ടപ്പെട്ടാൽ ആദ്യത്തെ ഒരു മണിക്കൂറിനുള്ളിൽ റിപ്പോർട്ട് ചെയ്താൽ പണം തിരികെ ലഭിക്കാനുള്ള സാധ്യത കൂടുതലാണ്."
];

export default function Marqueue({ language }: MarqueueProps) {
  const alerts = language === 'en' ? alertsEn : alertsMl;

  return (
    <section id="marqueue" className="py-8 relative select-none">
      <div className="w-full bg-gradient-to-r from-ictak-blue/5 via-ictak-cyan/5 to-ictak-blue/5 border-y border-slate-200/80 py-3 relative">
        <Marquee speed={50} pauseOnHover={true} gradient={false}>
          <div className="flex gap-16 font-space text-xs md:text-sm tracking-wider font-semibold text-slate-700">
            {alerts.map((alert, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <BsMegaphone className="text-ictak-cyan animate-bounce" />
                {alert}
              </span>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
