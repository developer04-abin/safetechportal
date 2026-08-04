import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import Magnetic from './Magnetic';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  organization: string;
  event: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  organization?: string;
  event?: string;
}

const eventOptions = [
  "Nexus Hackathon v2.0",
  "AI & Robotics Summit",
  "Cyber Defense Arena",
  "Cloud Native Workshop",
  "Web3 Innovation Summit",
  "Quantum Computing Seminar"
];

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', organization: '', event: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.organization.trim()) newErrors.organization = "College / Org is required";
    if (!form.event) newErrors.event = "Please select an event";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setForm({ name: '', email: '', phone: '', organization: '', event: '' });
    }, 1500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg glass-panel-heavy rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl z-10 select-none overflow-y-auto max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5 cursor-pointer"
            >
              <IoClose className="text-lg" />
            </button>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="mb-6">
                    <span className="font-space text-xs text-primary-cyan tracking-widest uppercase font-semibold">PARTICIPANT REGISTRATION</span>
                    <h3 className="font-space text-2xl md:text-3xl font-bold text-white mt-1">Reserve Your Spot</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="modal-name" className="text-xs font-space text-gray-400 uppercase">Full Name</label>
                      <input
                        type="text"
                        id="modal-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="bg-white/5 border border-white/5 focus:border-primary-cyan outline-none rounded-xl px-4 py-2.5 text-sm text-white font-sans transition-all duration-300"
                        placeholder="Arya Dev"
                      />
                      {errors.name && <span className="text-[10px] text-rose-500 font-space">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="modal-email" className="text-xs font-space text-gray-400 uppercase">Email Address</label>
                      <input
                        type="email"
                        id="modal-email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="bg-white/5 border border-white/5 focus:border-primary-cyan outline-none rounded-xl px-4 py-2.5 text-sm text-white font-sans transition-all duration-300"
                        placeholder="arya@example.com"
                      />
                      {errors.email && <span className="text-[10px] text-rose-500 font-space">{errors.email}</span>}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="modal-phone" className="text-xs font-space text-gray-400 uppercase">Phone Number</label>
                      <input
                        type="text"
                        id="modal-phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="bg-white/5 border border-white/5 focus:border-primary-cyan outline-none rounded-xl px-4 py-2.5 text-sm text-white font-sans transition-all duration-300"
                        placeholder="+1 (555) 0122"
                      />
                      {errors.phone && <span className="text-[10px] text-rose-500 font-space">{errors.phone}</span>}
                    </div>

                    {/* Organization */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="modal-org" className="text-xs font-space text-gray-400 uppercase">College / Organization</label>
                      <input
                        type="text"
                        id="modal-org"
                        name="organization"
                        value={form.organization}
                        onChange={handleChange}
                        className="bg-white/5 border border-white/5 focus:border-primary-cyan outline-none rounded-xl px-4 py-2.5 text-sm text-white font-sans transition-all duration-300"
                        placeholder="Stanford University"
                      />
                      {errors.organization && <span className="text-[10px] text-rose-500 font-space">{errors.organization}</span>}
                    </div>

                    {/* Event Selection */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="modal-event" className="text-xs font-space text-gray-400 uppercase">Target Event Node</label>
                      <select
                        id="modal-event"
                        name="event"
                        value={form.event}
                        onChange={handleChange}
                        className="bg-[#0f0f1c] border border-white/5 focus:border-primary-cyan outline-none rounded-xl px-4 py-2.5 text-sm text-white font-sans transition-all duration-300"
                      >
                        <option value="">Select an Event</option>
                        {eventOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      {errors.event && <span className="text-[10px] text-rose-500 font-space">{errors.event}</span>}
                    </div>

                    {/* Submit Button */}
                    <Magnetic range={40} strength={0.3}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-gradient-to-r from-primary-purple to-primary-cyan text-white font-space font-semibold uppercase tracking-wider text-xs rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300 cursor-pointer disabled:opacity-50 mt-2"
                      >
                        {isSubmitting ? "Processing..." : "Confirm Free Registration"}
                      </button>
                    </Magnetic>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center gap-4 py-8"
                >
                  <IoCheckmarkCircle className="text-6xl text-primary-cyan animate-pulse" />
                  <h3 className="font-space text-2xl font-bold text-white">Registration Approved</h3>
                  <p className="font-sans text-sm text-gray-400 font-light leading-relaxed">
                    Confirmations, digital ticketing credentials, and node setup requirements have been sent to your email. See you at the arena!
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-4 px-6 py-2 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 rounded-xl font-space text-xs font-semibold uppercase tracking-wider text-white transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
