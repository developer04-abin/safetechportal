import { useState, useEffect } from 'react';
import { translations } from '../utils/translations';
import { FiMessageSquare, FiX, FiSend, FiAlertOctagon } from 'react-icons/fi';

interface ChatbotProps {
  language: 'en' | 'ml';
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

export default function Chatbot({ language }: ChatbotProps) {
  const t = translations[language];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  // Initial welcome message when chatbot opens or changes language
  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: t.botWelcome
      }
    ]);
  }, [language, isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputText('');

    // Simulate bot response after delay
    setTimeout(() => {
      let botResponse = '';
      const cleanedText = text.toLowerCase();

      if (cleanedText.includes('bank') || cleanedText.includes('freeze') || cleanedText.includes('പണം') || cleanedText.includes('ബാങ്ക്')) {
        botResponse = language === 'en'
          ? "🚨 BANK COMPROMISE STEPS:\n1. Call your bank's official helpline immediately to freeze your accounts and UPI cards.\n2. Note down the transaction ID, bank accounts, and timestamps.\n3. Call 1930 immediately to submit a financial fraud report. Do this within 1 hour!"
          : "🚨 ബാങ്ക് അക്കൗണ്ട് മരവിപ്പിക്കാൻ:\n1. അക്കൗണ്ടുകളും യുപിഐ കാർഡുകളും മരവിപ്പിക്കാൻ ഉടൻ നിങ്ങളുടെ ബാങ്കിന്റെ ഔദ്യോഗിക ഹെൽപ്പ് ലൈനിൽ വിളിക്കുക.\n2. ട്രാൻസാക്ഷൻ ഐഡിയും സമയവും കുറിച്ചുവെക്കുക.\n3. പണം തിരികെ ലഭിക്കാനുള്ള ഏറ്റവും ഉയർന്ന സാധ്യതയ്ക്കായി 1 മണിക്കൂറിനുള്ളിൽ 1930 എന്ന നമ്പറിൽ ഉടൻ വിളിക്കുക.";
      } else if (cleanedText.includes('sim') || cleanedText.includes('block') || cleanedText.includes('സിം')) {
        botResponse = language === 'en'
          ? "📱 LOST SIM CARD ACTION:\n1. Contact your telecom operator (Jio, Airtel, BSNL, Vi) immediately to block the SIM card and prevent OTP intercept.\n2. Visit the nearest store with identity documents to issue a replacement SIM.\n3. Report loss to local police database to prevent unauthorized usage liability."
          : "📱 സിം കാർഡ് ബ്ലോക്ക് ചെയ്യാൻ:\n1. ഒടിപികൾ ദുരുപയോഗം ചെയ്യുന്നത് തടയാൻ ടെലികോം ഓപ്പറേറ്ററെ (Jio, Airtel, BSNL, Vi) ഉടൻ വിളിച്ച് സിം ബ്ലോക്ക് ചെയ്യുക.\n2. ആവശ്യമായ രേഖകളുമായി തൊട്ടടുത്ത സ്റ്റോറിൽ പോയി പുതിയ സിം കാർഡ് വാങ്ങുക.\n3. നിയമപരമായ ബാധ്യതകൾ ഒഴിവാക്കാൻ നഷ്ടപ്പെട്ട വിവരം പോലീസിൽ അറിയിക്കുക.";
      } else if (cleanedText.includes('report') || cleanedText.includes('fraud') || cleanedText.includes('പരാതി')) {
        botResponse = language === 'en'
          ? "✍️ GENERAL REPORTING GUIDELINES:\n- For financial frauds: Call 1930 immediately.\n- For social media harassment, identity theft, or child abuse: Submit detailed screenshots and logs online at the National Cyber Crime Reporting Portal: https://cybercrime.gov.in or visit your local Cyber Police station."
          : "✍️ സൈബർ പരാതികൾ നൽകാൻ:\n- സാമ്പത്തിക തട്ടിപ്പുകൾക്ക്: ഉടൻ 1930 വിളിക്കുക.\n- സോഷ്യൽ മീഡിയ അധിക്ഷേപങ്ങൾ, വ്യാജ പ്രൊഫൈലുകൾ എന്നിവയ്ക്ക്: സ്ക്രീൻഷോട്ടുകൾ സഹിതം https://cybercrime.gov.in എന്ന ഔദ്യോഗിക പോർട്ടൽ വഴി പരാതി നൽകുക അല്ലെങ്കിൽ അടുത്തുള്ള സൈബർ പോലീസ് സ്റ്റേഷൻ സന്ദർശിക്കുക.";
      } else {
        botResponse = language === 'en'
          ? "I am a cyber security assistant trained for SafeTech Kerala. I can guide you on freezing bank accounts, blocking SIM cards, and reporting scams. If you are a victim of financial crime, please call 1930 immediately!"
          : "സേഫ്ടെക് കേരളയുടെ സൈബർ അസിസ്റ്റന്റാണ് ഞാൻ. ബാങ്ക് അക്കൗണ്ടുകൾ മരവിപ്പിക്കൽ, സിം കാർഡ് ബ്ലോക്ക് ചെയ്യൽ, തട്ടിപ്പുകൾ റിപ്പോർട്ട് ചെയ്യൽ എന്നിവയിൽ സഹായിക്കാം. സാമ്പത്തിക തട്ടിപ്പ് നടന്നാൽ ദയവായി ഉടൻ 1930 വിളിക്കുക!";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[50] flex flex-col items-end">
      
      {/* Expanded Chat Widget */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[450px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden mb-4 transition-all duration-300">
          {/* Header */}
          <div className="bg-ictak-blue p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
              <span className="font-space font-bold text-xs uppercase tracking-wider">{t.botTitle}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-slate-200 cursor-pointer"
              title={t.botClose}
            >
              <FiX className="text-lg" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[80%] ${
                  msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed text-left whitespace-pre-line shadow-sm border ${
                    msg.sender === 'user'
                      ? 'bg-ictak-blue border-ictak-blue text-white rounded-tr-none'
                      : 'bg-white border-slate-200 text-slate-800 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions Guide buttons inside chat */}
          <div className="p-2 bg-slate-100/50 border-t border-slate-100 flex flex-wrap gap-1.5 justify-start">
            <button
              onClick={() => handleSendMessage(t.botFreezeBank)}
              className="px-2.5 py-1 text-[10px] font-semibold bg-white border border-slate-200 rounded-full hover:bg-ictak-cyan/10 hover:border-ictak-cyan transition text-slate-700 cursor-pointer"
            >
              {t.botFreezeBank}
            </button>
            <button
              onClick={() => handleSendMessage(t.botBlockSim)}
              className="px-2.5 py-1 text-[10px] font-semibold bg-white border border-slate-200 rounded-full hover:bg-ictak-cyan/10 hover:border-ictak-cyan transition text-slate-700 cursor-pointer"
            >
              {t.botBlockSim}
            </button>
            <button
              onClick={() => handleSendMessage(t.botReportFraud)}
              className="px-2.5 py-1 text-[10px] font-semibold bg-white border border-slate-200 rounded-full hover:bg-ictak-cyan/10 hover:border-ictak-cyan transition text-slate-700 cursor-pointer"
            >
              {t.botReportFraud}
            </button>
            <a
              href="tel:1930"
              className="px-2.5 py-1 text-[10px] font-bold bg-red-50 text-emergency-red border border-red-100 rounded-full hover:bg-red-100 transition flex items-center gap-1 cursor-pointer"
            >
              <FiAlertOctagon />
              1930
            </a>
          </div>

          {/* Send Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-3 border-t border-slate-200 flex gap-2 bg-white"
          >
            <input
              type="text"
              placeholder={t.botPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-grow px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-ictak-cyan text-slate-900"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-ictak-blue hover:bg-ictak-blue/90 text-white flex items-center justify-center cursor-pointer shadow-sm"
            >
              <FiSend className="text-xs" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Chat Icon Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-ictak-blue hover:bg-ictak-blue/95 text-white flex items-center justify-center text-xl cursor-pointer shadow-lg hover:scale-105 transition-all duration-300"
        title={t.botOpen}
      >
        {isOpen ? <FiX /> : <FiMessageSquare />}
      </button>

    </div>
  );
}
