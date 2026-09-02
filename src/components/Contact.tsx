import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMailOutline, IoCallOutline, IoLocationOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { translations } from '../utils/translations';

interface ContactProps {
  language: 'en' | 'ml';
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact({ language }: ContactProps) {
  const t = translations[language];

  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = language === 'en' ? "Name is required" : "പേര് ആവശ്യമാണ്";
    if (!form.email.trim()) {
      newErrors.email = language === 'en' ? "Email is required" : "ഇമെയിൽ ആവശ്യമാണ്";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = language === 'en' ? "Invalid email format" : "തെറ്റായ ഇമെയിൽ വിലാസം";
    }
    if (!form.subject.trim()) newErrors.subject = language === 'en' ? "Subject is required" : "വിഷയം ആവശ്യമാണ്";
    if (!form.message.trim()) newErrors.message = language === 'en' ? "Message is required" : "സന്ദേശം ആവശ്യമാണ്";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 lg:py-24 bg-slate-50 dark:bg-[#06060c] border-b border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-14">
          <span className="font-space text-xs tracking-wider text-ictak-blue dark:text-ictak-cyan uppercase font-bold">
            {language === 'en' ? 'Get In Touch' : 'ബന്ധപ്പെടുക'}
          </span>
          <h2 className="h2-scale font-space text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2">
            {t.contact}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Column 1: Info and Google Map */}
          <div className="flex flex-col justify-between gap-6 text-left">
            <div className="flex flex-col gap-5">
              <h3 className="h3-scale text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-space">
                {language === 'en' ? 'Campaign Headquarters' : 'പോർട്ടൽ ഓഫീസ് വിലാസം'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                {language === 'en'
                  ? 'Have questions about onboarding schools, launching community SafeTech clubs, or partnering with master trainers? Contact our coordination cell.'
                  : 'സ്കൂളുകളിലെ ക്ലബ് രൂപീകരണം, പഞ്ചായത്ത് തല പ്രവർത്തനങ്ങൾ, പാഠ്യപദ്ധതി എന്നിവയെക്കുറിച്ചുള്ള സംശയങ്ങൾക്ക് ഞങ്ങളുമായി ബന്ധപ്പെടാം.'}
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-ictak-blue dark:text-ictak-cyan text-lg shadow-sm">
                    <IoMailOutline />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-space font-bold uppercase">Email us</span>
                    <a href="mailto:info@ictkerala.org" className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:text-ictak-cyan transition-colors font-semibold">
                      info@ictkerala.org
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-ictak-blue dark:text-ictak-cyan text-lg shadow-sm">
                    <IoCallOutline />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-space font-bold uppercase font-semibold">Call support</span>
                    <a href="tel:+914712700811" className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:text-ictak-cyan transition-colors font-semibold">
                      +91 471 2700811
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-ictak-blue dark:text-ictak-cyan text-lg shadow-sm">
                    <IoLocationOutline />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-space font-bold uppercase">Headquarters</span>
                    <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                      L-9, Thejaswini Building, Technopark Campus, Trivandrum, Kerala 695581
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map (Technopark location) */}
            <div className="w-full h-52 sm:h-64 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md relative">
              <iframe
                title="ICTAK Technopark Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.7485084964687!2d76.879796014783!3d8.55743899384876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05beebd5d1b7d5%3A0xe5a36391d1e43e24!2sICT%20Academy%20of%20Kerala!5e0!3m2!1sen!2sin!4v1625076939521!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>

          {/* Column 2: Contact Form */}
          <div className="safetech-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl flex flex-col justify-center relative min-h-[400px]">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 text-left"
                >
                  <h3 className="h3-scale text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-space mb-1">
                    {language === 'en' ? 'Send Message' : 'സന്ദേശം അയക്കുക'}
                  </h3>

                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-name" className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400 font-space">
                      {language === 'en' ? 'Your Name' : 'പേര്'}
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-ictak-cyan text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                    {errors.name && <span className="text-[10px] text-red-500 font-mono mt-0.5">{errors.name}</span>}
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-email" className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400 font-space">
                      {language === 'en' ? 'Email Address' : 'ഇമെയിൽ വിലാസം'}
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-ictak-cyan text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                    {errors.email && <span className="text-[10px] text-red-500 font-mono mt-0.5">{errors.email}</span>}
                  </div>

                  {/* Subject Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-subject" className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400 font-space">
                      {language === 'en' ? 'Subject' : 'വിഷയം'}
                    </label>
                    <input
                      type="text"
                      id="form-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-ictak-cyan text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                    {errors.subject && <span className="text-[10px] text-red-500 font-mono mt-0.5">{errors.subject}</span>}
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-message" className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400 font-space">
                      {language === 'en' ? 'Your Message' : 'സന്ദേശം'}
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-ictak-cyan text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
                    />
                    {errors.message && <span className="text-[10px] text-red-500 font-mono mt-0.5">{errors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-ictak-blue to-ictak-cyan hover:opacity-95 text-white font-space font-bold uppercase text-xs sm:text-sm tracking-wider transition shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting 
                      ? (language === 'en' ? "TRANSMITTING..." : "അയക്കുന്നു...") 
                      : (language === 'en' ? "SEND MESSAGE" : "സന്ദേശം അയക്കുക")}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center gap-4 py-12"
                >
                  <IoCheckmarkCircle className="text-5xl text-emerald-500 animate-pulse" />
                  <h3 className="font-space text-xl font-bold text-slate-900 dark:text-white">
                    {language === 'en' ? 'Message Transmitted' : 'സന്ദേശം ലഭിച്ചു'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light max-w-sm leading-relaxed">
                    {language === 'en'
                      ? 'Thank you! Your query has been successfully transmitted. Our coordination desk will follow up shortly.'
                      : 'നന്ദി! നിങ്ങളുടെ സന്ദേശം ലഭിച്ചിട്ടുണ്ട്. ഞങ്ങളുടെ കമ്മ്യൂണിറ്റി വിഭാഗം നിങ്ങളുമായി ഉടൻ ബന്ധപ്പെടും.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
}
