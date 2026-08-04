import { useState } from 'react';
import { translations } from '../utils/translations';
import { FiCheck, FiX, FiAward, FiBook } from 'react-icons/fi';

interface CyberQuizProps {
  language: 'en' | 'ml';
}

interface Question {
  questionEn: string;
  questionMl: string;
  optionsEn: string[];
  optionsMl: string[];
  correctAnswer: number;
  explanationEn: string;
  explanationMl: string;
}

export default function CyberQuiz({ language }: CyberQuizProps) {
  const t = translations[language];

  const quizQuestions: Question[] = [
    {
      questionEn: "You receive an SMS claiming you won a cash reward of ₹50,000 with a link to claim it immediately. What should you do?",
      questionMl: "നിങ്ങൾക്ക് 50,000 രൂപ സമ്മാനം ലഭിച്ചുവെന്ന സന്ദേശവും അത് വാങ്ങാനായി ലിങ്കും അടങ്ങിയ ഒരു എസ്എംഎസ് ലഭിച്ചു. നിങ്ങൾ എന്ത് ചെയ്യണം?",
      optionsEn: [
        "Click the link and fill in your details.",
        "Ignore and delete the message immediately.",
        "Forward the SMS to all your WhatsApp groups."
      ],
      optionsMl: [
        "ലിങ്കിൽ ക്ലിക്ക് ചെയ്ത് നിങ്ങളുടെ വിവരങ്ങൾ നൽകുക.",
        "സന്ദേശം അവഗണിക്കുകയും ഉടൻ തന്നെ ഡിലീറ്റ് ചെയ്യുകയും ചെയ്യുക.",
        "നിങ്ങളുടെ എല്ലാ വാട്സാപ്പ് ഗ്രൂപ്പുകളിലേക്കും ഇത് അയക്കുക."
      ],
      correctAnswer: 1,
      explanationEn: "Links in lottery winning messages are phishing traps designed to steal your credentials and personal info. Never click them.",
      explanationMl: "സമ്മാനം ലഭിച്ചെന്ന സന്ദേശങ്ങളിലെ ലിങ്കുകൾ ഫിഷിംഗ് തട്ടിപ്പുകളാണ്. ഇവ ക്ലിക്ക് ചെയ്യുന്നത് വഴി വ്യക്തിവിവരങ്ങൾ ചോരാൻ സാധ്യതയുണ്ട്."
    },
    {
      questionEn: "What is Multi-Factor Authentication (MFA)?",
      questionMl: "മൾട്ടി-ഫാക്ടർ ഓഥന്റിക്കേഷൻ (MFA) എന്നാൽ എന്താണ്?",
      optionsEn: [
        "Having multiple passwords for one account.",
        "Adding an extra verification step (like OTP or Authenticator app) to secure accounts.",
        "Using multiple social networks simultaneously."
      ],
      optionsMl: [
        "ഒരു അക്കൗണ്ടിനായി ഒന്നിലധികം പാസ്‌വേഡുകൾ നൽകുക.",
        "OTP അല്ലെങ്കിൽ ഓഥന്റിക്കേറ്റർ ആപ്പ് പോലുള്ള അധിക വെരിഫിക്കേഷൻ സ്റ്റെപ്പ് ഉപയോഗിച്ച് അക്കൗണ്ട് കൂടുതൽ സുരക്ഷിതമാക്കുക.",
        "ഒരേ സമയം പല സോഷ്യൽ നെറ്റവർക്കുകൾ ഉപയോഗിക്കുക."
      ],
      correctAnswer: 1,
      explanationEn: "MFA blocks hackers even if they know your password by requiring a secondary verification token code.",
      explanationMl: "നിങ്ങളുടെ പാസ്‌വേഡ് മറ്റാരെങ്കിലും അറിഞ്ഞാൽ പോലും രണ്ടാമത്തെ സുരക്ഷാ കോഡ് (MFA) ഉള്ളതിനാൽ ലോഗിൻ ചെയ്യാൻ തടസ്സമാകും."
    },
    {
      questionEn: "You receive an urgent email from 'your bank' saying your account is suspended unless you click a link and login. What should you do?",
      questionMl: "നിങ്ങളുടെ ബാങ്ക് അക്കൗണ്ട് താൽക്കാലികമായി നിർത്തലാക്കിയെന്നും അത് പുനരാരംഭിക്കാൻ ലിങ്കിൽ ക്ലിക്ക് ചെയ്യണമെന്നും കാണിച്ച് ഒരു ഇമെയിൽ വന്നു. നിങ്ങൾ എന്ത് ചെയ്യും?",
      optionsEn: [
        "Click the link and input your bank account number and password.",
        "Reply to the email requesting explanation.",
        "Do NOT click. Call your bank branch directly using the official helpline."
      ],
      optionsMl: [
        "ലിങ്കിൽ ക്ലിക്ക് ചെയ്ത് ബാങ്ക് അക്കൗണ്ട് നമ്പറും പാസ്‌വേഡും നൽകുക.",
        "വിശദീകരണം ആവശ്യപ്പെട്ട് ഇമെയിലിന് മറുപടി നൽകുക.",
        "ക്ലിക്ക് ചെയ്യരുത്. ബാങ്കുമായി ഔദ്യോഗിക നമ്പർ വഴി നേരിട്ട് ബന്ധപ്പെടുക."
      ],
      correctAnswer: 2,
      explanationEn: "Banks will never send links in emails asking you to type sensitive passwords or verification details. Always contact them directly.",
      explanationMl: "രഹസ്യ പാസ്‌വേഡുകളോ ഒടിപികളോ നൽകാൻ ആവശ്യപ്പെട്ട് ബാങ്കുകൾ ഒരിക്കലും ലിങ്കുകൾ അയക്കില്ല. ബാങ്കിന്റെ യഥാർത്ഥ നമ്പറിൽ മാത്രം വിളിക്കുക."
    },
    {
      questionEn: "Which of the following is the strongest and safest password strategy?",
      questionMl: "ഏറ്റവും മികച്ചതും സുരക്ഷിതവുമായ പാസ്‌വേഡ് ഏതാണ്?",
      optionsEn: [
        "Your first name and birth year (e.g., Rahul1995).",
        "A long passphrase mixing letters, numbers, and special symbols (e.g., K3r@laP01ic3#S@f3).",
        "A common word with 123 (e.g., password123)."
      ],
      optionsMl: [
        "നിങ്ങളുടെ പേരും ജനിച്ച വർഷവും ചേർത്ത് നൽകുക (ഉദാ: Rahul1995).",
        "അക്ഷരങ്ങൾ, അക്കങ്ങൾ, ചിഹ്നങ്ങൾ എന്നിവ ചേർത്തുള്ള വലിയ വാചകങ്ങൾ ഉപയോഗിക്കുക (ഉദാ: K3r@laP01ic3#S@f3).",
        "ലളിതമായ വാക്കുകൾക്കൊപ്പം 123 നൽകുക (ഉദാ: password123)."
      ],
      correctAnswer: 1,
      explanationEn: "Long phrases with mixed characters are exponentially harder for hackers to crack using automated software.",
      explanationMl: "വിവിധതരം ചിഹ്നങ്ങളും അക്കങ്ങളും അടങ്ങിയ പാസ്‌വേഡുകൾ ക്രാക്ക് ചെയ്യാൻ ഹാക്കർമാർക്ക് വളരെ ബുദ്ധിമുട്ടാണ്."
    },
    {
      questionEn: "What is the official emergency national helpline number to report online financial frauds?",
      questionMl: "ഓൺലൈൻ സാമ്പത്തിക തട്ടിപ്പുകൾ റിപ്പോർട്ട് ചെയ്യാനുള്ള ഔദ്യോഗിക അടിയന്തര ദേശീയ ഹെൽപ്പ് ലൈൻ നമ്പർ ഏതാണ്?",
      optionsEn: [
        "100",
        "1930",
        "112"
      ],
      optionsMl: [
        "100",
        "1930",
        "112"
      ],
      correctAnswer: 1,
      explanationEn: "1930 is the dedicated Cyber Crime Helpline. Call immediately within the first hour of a financial scam for highest chance of money recovery.",
      explanationMl: "1930 എന്നത് സൈബർ കുറ്റകൃത്യങ്ങൾക്കായുള്ള ഹെൽപ്പ് ലൈൻ ആണ്. തട്ടിപ്പ് നടന്ന ഉടൻ വിളിച്ചാൽ പണം നഷ്ടപ്പെടാതെ സൂക്ഷിക്കാൻ സാധിക്കും."
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(-1); // -1 is intro state
  const [score, setScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const start = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedAns(null);
    setIsAnswered(false);
  };

  const handleAnswerSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedAns(optionIdx);
    setIsAnswered(true);
    if (optionIdx === quizQuestions[currentIdx].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedAns(null);
    setCurrentIdx(prev => prev + 1);
  };

  const getLmsRecommendation = () => {
    if (score === 5) {
      return {
        title: language === 'en' ? "Digital Jagratha Ambassador (15 Credits)" : "ഡിജിറ്റൽ ജാഗ്രത അംബാസഡർ (15 ക്രെഡിറ്റ്)",
        desc: language === 'en' 
          ? "Excellent score! You are ready to lead. Sign up for the official ambassador modules to get licensed certification."
          : "മികച്ച സ്കോർ! സേഫ്ടെക് ഔദ്യോഗിക അംബാസഡർ കോഴ്സിൽ രജിസ്റ്റർ ചെയ്ത് സർട്ടിഫിക്കറ്റ് നേടാൻ നിങ്ങൾ യോഗ്യനാണ്.",
        link: "#audience-routing"
      };
    } else if (score >= 3) {
      return {
        title: language === 'en' ? "Digital Wellness & Workplace Hygiene" : "ഡിജിറ്റൽ വെൽനസ്സ് & വർക്ക്പ്ലേസ് ഹൈജീൻ",
        desc: language === 'en' 
          ? "Good job! Enhance your day-to-day security knowledge with these professional cyber-safety toolkits."
          : "നല്ല പ്രകടനം! നിങ്ങളുടെ ദൈനംദിന അറിവുകൾ വർദ്ധിപ്പിക്കുന്നതിന് ഈ കോഴ്സ് സഹായിക്കും.",
        link: "#resources"
      };
    } else {
      return {
        title: language === 'en' ? "Cyber Hygiene Basics & Fraud Prevention" : "സൈബർ ഹൈജീൻ ബേസിക്സ് & തട്ടിപ്പ് തടയൽ",
        desc: language === 'en' 
          ? "Review the basics. We highly recommend going through the micro-videos on fraud prevention before browsing safely."
          : "സൈബർ തട്ടിപ്പുകൾ തടയുന്നതിനുള്ള ലളിതമായ വീഡിയോകളും അടിസ്ഥാന വിവരങ്ങളും ഈ കോഴ്സിൽ ലഭ്യമാണ്.",
        link: "#resources"
      };
    }
  };

  return (
    <section id="cyber-quiz" className="py-20 bg-slate-50 dark:bg-slate-900 border-b border-slate-200/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="h2-scale font-space text-3xl font-bold text-slate-900 tracking-tight">
            {t.quizTitle}
          </h2>
          <p className="text-sm text-slate-500 font-light mt-2">
            {t.quizSubtitle}
          </p>
        </div>

        {/* Card Quiz Panel */}
        <div className="safetech-card p-6 sm:p-10 rounded-3xl bg-white border-slate-200/60 shadow-md">
          {currentIdx === -1 ? (
            /* Intro State */
            <div className="text-center py-6 flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-ictak-blue/5 text-ictak-blue border border-ictak-blue/10 flex items-center justify-center text-3xl">
                <FiAward />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed max-w-md">
                {language === 'en'
                  ? "Test your digital safety knowledge! Answer these 5 real-life scenario questions to understand your cyber vulnerability."
                  : "നിങ്ങളുടെ ഡിജിറ്റൽ സുരക്ഷാ അറിവ് പരീക്ഷിക്കൂ! സൈബർ സുരക്ഷിതരാണോ എന്ന് വിലയിരുത്താൻ 5 ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുക."}
              </p>
              <button
                onClick={start}
                className="px-8 py-3 rounded-xl bg-ictak-blue hover:bg-ictak-blue/90 text-white font-space font-bold uppercase tracking-wider text-sm cursor-pointer shadow-sm"
              >
                {t.startQuiz}
              </button>
            </div>
          ) : currentIdx < quizQuestions.length ? (
            /* Question State */
            <div>
              {/* Progress bar */}
              <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-4">
                <span>{t.question} {currentIdx + 1} / {quizQuestions.length}</span>
                <span>Score: {score}</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-8">
                <div
                  className="bg-ictak-cyan h-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="h3-scale text-base sm:text-lg font-bold text-slate-900 font-space mb-6">
                {language === 'en' ? quizQuestions[currentIdx].questionEn : quizQuestions[currentIdx].questionMl}
              </h3>

              {/* Options */}
              <div className="flex flex-col gap-4">
                {(language === 'en' ? quizQuestions[currentIdx].optionsEn : quizQuestions[currentIdx].optionsMl).map((option, oIdx) => {
                  const isSelected = selectedAns === oIdx;
                  const isCorrect = oIdx === quizQuestions[currentIdx].correctAnswer;
                  
                  let optStyle = "border-slate-200 hover:bg-slate-50";
                  if (isAnswered) {
                    if (isCorrect) optStyle = "bg-green-50 border-green-500 text-green-800";
                    else if (isSelected) optStyle = "bg-red-50 border-red-500 text-red-800";
                    else optStyle = "opacity-60 border-slate-150";
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isAnswered}
                      onClick={() => handleAnswerSelect(oIdx)}
                      className={`w-full text-left px-5 py-4 border rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer flex justify-between items-center ${optStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswered && isCorrect && <FiCheck className="text-green-600 text-lg shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <FiX className="text-red-600 text-lg shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Panel */}
              {isAnswered && (
                <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 text-left">
                  <span className="font-bold text-slate-800 block mb-1">
                    {language === 'en' ? "Explanation:" : "വിശദീകരണം:"}
                  </span>
                  {language === 'en' ? quizQuestions[currentIdx].explanationEn : quizQuestions[currentIdx].explanationMl}
                </div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <button
                  onClick={currentIdx === quizQuestions.length - 1 ? handleNext : handleNext}
                  className="w-full mt-6 py-3.5 bg-ictak-blue hover:bg-ictak-blue/90 text-white rounded-xl font-space font-bold uppercase text-xs sm:text-sm tracking-wider cursor-pointer"
                >
                  {currentIdx === quizQuestions.length - 1 ? t.finish : t.next}
                </button>
              )}
            </div>
          ) : (
            /* Results State */
            <div className="text-center flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-ictak-cyan/10 text-ictak-cyan flex items-center justify-center text-3xl">
                <FiAward />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="h3-scale text-xl font-bold font-space text-slate-900">
                  {language === 'en' ? 'Assessment Completed!' : 'ക്വിസ് പൂർത്തിയായി!'}
                </h3>
                <span className="text-sm text-slate-600 font-space font-bold">
                  {t.quizScore}: {score} / {quizQuestions.length}
                </span>
              </div>

              {/* Course Recommendations */}
              <div className="w-full max-w-md border border-slate-200 rounded-2xl p-5 text-left bg-slate-50 mt-2">
                <span className="text-[10px] font-space tracking-wider uppercase font-bold text-ictak-cyan flex items-center gap-1.5 mb-2">
                  <FiBook />
                  {t.recommendation}
                </span>
                <h4 className="font-bold text-sm text-slate-800 font-space mb-1.5">
                  {getLmsRecommendation().title}
                </h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed mb-4">
                  {getLmsRecommendation().desc}
                </p>
                <a
                  href={getLmsRecommendation().link}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(getLmsRecommendation().link)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 bg-ictak-blue text-white rounded-xl font-space font-bold text-xs uppercase tracking-wider block text-center cursor-pointer hover:bg-ictak-blue/90 shadow-sm"
                >
                  {t.viewLms}
                </a>
              </div>

              <button
                onClick={start}
                className="mt-2 text-xs font-bold font-space uppercase text-slate-500 hover:text-ictak-blue cursor-pointer"
              >
                {t.retry}
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
