import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoClose, 
  IoCheckmarkCircle, 
  IoSchoolOutline, 
  IoLocationOutline, 
  IoPersonOutline, 
  IoMailOutline,  
  IoCopyOutline,
  IoDownloadOutline
} from 'react-icons/io5';
import { districts } from '../utils/translations';

interface DigitalJagrathaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AmbassadorFormData {
  name: string;
  email: string;
  institution: string;
  highestQualification: string;
  branch: string;
  stream: string;
  district: string;
  panchayathOrMunicipality: string;
  place: string;
  pin: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  institution?: string;
  highestQualification?: string;
  branch?: string;
  stream?: string;
  district?: string;
  panchayathOrMunicipality?: string;
  place?: string;
  pin?: string;
}

// Highest Qualification Options
const qualificationOptions = [
  "Secondary School (SSLC / 10th Standard)",
  "Higher Secondary (+2 / VHSE / CBSE / ICSE)",
  "Diploma / Polytechnic",
  "Bachelor's Degree (B.Tech / B.E)",
  "Bachelor's Degree (B.Sc / BCA / B.Com / BA / BBA)",
  "Master's Degree (M.Tech / M.E)",
  "Master's Degree (M.Sc / MCA / M.Com / MA / MBA)",
  "Doctorate / Ph.D. / Research Scholar",
  "Other Professional Degree"
];

// Streams
const streamOptions = [
  "Engineering & Technology",
  "Computer Applications & IT",
  "Physical & Natural Sciences",
  "Commerce, Banking & Management",
  "Humanities, Arts & Social Sciences",
  "Medical & Allied Healthcare",
  "Vocational & Skill Studies",
  "Law & Legal Studies",
  "General Education"
];

// Branches / Specializations
const branchOptions = [
  "Computer Science & Engineering",
  "Artificial Intelligence & Data Science",
  "Cyber Security & Digital Forensics",
  "Information Technology",
  "Electronics & Communication Engineering",
  "Electrical & Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Commerce & Computer Applications",
  "Business Administration & Finance",
  "Physics / Chemistry / Mathematics",
  "English / Journalism / Mass Communication",
  "Sociology / Political Science / Psychology",
  "Biotechnology / Life Sciences",
  "Other Specialization"
];

// Panchayath / Municipality / Corporation dummy data for Kerala
const lsgdOptions = [
  {
    category: "Municipalities (നഗരസഭകൾ)",
    items: [
      "Kalamassery Municipality",
      "Aluva Municipality",
      "Thripunithura Municipality",
      "Perumbavoor Municipality",
      "Angamaly Municipality",
      "Tirur Municipality",
      "Ponnani Municipality",
      "Manjeri Municipality",
      "Ottapalam Municipality",
      "Chittur-Thathamangalam Municipality",
      "Thalassery Municipality",
      "Payyanur Municipality",
      "Kayamkulam Municipality",
      "Cherthala Municipality",
      "Kunnamkulam Municipality",
      "Chalakudy Municipality",
      "Kodungallur Municipality",
      "Nedumangad Municipality",
      "Attingal Municipality",
      "Neyyattinkara Municipality",
      "Pala Municipality",
      "Changanassery Municipality",
      "Vaikom Municipality",
      "Kottarakkara Municipality",
      "Punalur Municipality",
      "Thiruvalla Municipality",
      "Adoor Municipality",
      "Kanhangad Municipality",
      "Kasargod Municipality",
      "Kalpetta Municipality",
      "Sulthan Bathery Municipality",
      "Mananthavady Municipality"
    ]
  },
  {
    category: "Grama Panchayaths (ഗ്രാമപഞ്ചായത്തുകൾ)",
    items: [
      "Venganoor Grama Panchayath",
      "Cheranalloor Grama Panchayath",
      "Nedumbassery Grama Panchayath",
      "Kumarakom Grama Panchayath",
      "Maradu Grama Panchayath",
      "Chellanam Grama Panchayath",
      "Mulavukad Grama Panchayath",
      "Edathala Grama Panchayath",
      "Vazhakkulam Grama Panchayath",
      "Kadakkal Grama Panchayath",
      "Anchal Grama Panchayath",
      "Meppadi Grama Panchayath",
      "Vythiri Grama Panchayath",
      "Munnar Grama Panchayath",
      "Adimali Grama Panchayath",
      "Kumily Grama Panchayath",
      "Kondotty Grama Panchayath",
      "Nilambur Grama Panchayath",
      "Pattambi Grama Panchayath",
      "Alathur Grama Panchayath",
      "Guruvayur Grama Panchayath",
      "Ollur Grama Panchayath",
      "Balussery Grama Panchayath",
      "Kunnamangalam Grama Panchayath",
      "Peravoor Grama Panchayath",
      "Irikkur Grama Panchayath",
      "Nileshwaram Grama Panchayath",
      "Kallooppara Grama Panchayath",
      "Mallappally Grama Panchayath",
      "Muhamma Grama Panchayath",
      "Ambalapuzha Grama Panchayath"
    ]
  },
  {
    category: "Municipal Corporations (കോർപ്പറേഷനുകൾ)",
    items: [
      "Thiruvananthapuram Municipal Corporation",
      "Kochi Municipal Corporation",
      "Kozhikode Municipal Corporation",
      "Kollam Municipal Corporation",
      "Thrissur Municipal Corporation",
      "Kannur Municipal Corporation"
    ]
  }
];

const initialFormData: AmbassadorFormData = {
  name: '',
  email: '',
  institution: '',
  highestQualification: '',
  branch: '',
  stream: '',
  district: '',
  panchayathOrMunicipality: '',
  place: '',
  pin: ''
};

export default function DigitalJagrathaModal({ isOpen, onClose }: DigitalJagrathaModalProps) {
  const [formData, setFormData] = useState<AmbassadorFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ambassadorId, setAmbassadorId] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    else if (formData.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.institution.trim()) newErrors.institution = "Institution/College name is required";
    if (!formData.highestQualification) newErrors.highestQualification = "Select highest qualification";
    if (!formData.branch) newErrors.branch = "Select branch/major";
    if (!formData.stream) newErrors.stream = "Select academic stream";
    if (!formData.district) newErrors.district = "Select your district";
    if (!formData.panchayathOrMunicipality) newErrors.panchayathOrMunicipality = "Select Panchayath or Municipality";
    if (!formData.place.trim()) newErrors.place = "Place / Locality is required";

    if (!formData.pin.trim()) {
      newErrors.pin = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.pin.trim())) {
      newErrors.pin = "PIN code must be a 6-digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API registration & generate unique Ambassador ID
    setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const districtPrefix = (formData.district || 'KER').substring(0, 3).toUpperCase();
      const generatedId = `STK-JA-${districtPrefix}-2026-${randomNum}`;
      
      setAmbassadorId(generatedId);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  const handleCopyId = () => {
    if (ambassadorId) {
      navigator.clipboard.writeText(ambassadorId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2500);
    }
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md"
        >
          {/* Backdrop click listener */}
          <div 
            onClick={handleClose} 
            className="fixed inset-0" 
          />

          {/* Modal Container: Single Primary Scroll Container */}
          <motion.div
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-white dark:bg-[#0c1020] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-10 my-auto overflow-y-auto max-h-[88vh] overscroll-contain flex flex-col focus:outline-none"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* Top Accent Gradient Bar */}
            <div className="h-2 w-full bg-gradient-to-r from-ictak-blue via-ictak-cyan to-emerald-400 shrink-0 sticky top-0 z-30" />

            {/* Header (Sticky at top of scrollable container) */}
            <div className="sticky top-2 z-20 p-5 sm:p-6 md:p-7 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-white/95 dark:bg-[#0c1020]/95 backdrop-blur-md shrink-0">
              <div>
                <h2 className="font-space text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Digital Jagratha Ambassador <span className="text-ictak-cyan">Registration</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light mt-0.5">
                  Please fill in your details to register as an official ambassador for cyber safety & awareness.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer shrink-0 border border-slate-200 dark:border-slate-700"
                aria-label="Close dialog"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            {/* Scrollable Form Content */}
            <div className="p-5 sm:p-6 md:p-8 space-y-6">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="registration-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    {/* SECTION 1: Personal & Contact Information */}
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-xs font-space font-bold uppercase tracking-wider text-ictak-blue dark:text-ictak-cyan">
                        <IoPersonOutline className="text-base" />
                        Section 1: Personal & Contact Information
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="modal-amb-name" className="text-xs font-space text-slate-700 dark:text-slate-300 font-medium">
                            Full Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="modal-amb-name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Enter your full name"
                              className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-950 border ${
                                errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-slate-300 dark:border-slate-750 focus:border-ictak-cyan'
                              } focus:outline-none text-slate-900 dark:text-white transition`}
                            />
                            <IoPersonOutline className="absolute left-3 top-3 text-slate-400 text-sm" />
                          </div>
                          {errors.name && <span className="text-[11px] text-rose-500 font-space">{errors.name}</span>}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="modal-amb-email" className="text-xs font-space text-slate-700 dark:text-slate-300 font-medium">
                            Email Address <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              id="modal-amb-email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="name@example.com"
                              className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-950 border ${
                                errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-slate-300 dark:border-slate-750 focus:border-ictak-cyan'
                              } focus:outline-none text-slate-900 dark:text-white transition`}
                            />
                            <IoMailOutline className="absolute left-3 top-3 text-slate-400 text-sm" />
                          </div>
                          {errors.email && <span className="text-[11px] text-rose-500 font-space">{errors.email}</span>}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: Academic & Institutional Profile */}
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-xs font-space font-bold uppercase tracking-wider text-ictak-blue dark:text-ictak-cyan">
                        <IoSchoolOutline className="text-base" />
                        Section 2: Academic & Institutional Details
                      </div>

                      {/* Institution */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="modal-amb-inst" className="text-xs font-space text-slate-700 dark:text-slate-300 font-medium">
                          Institution / College / School Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="modal-amb-inst"
                          name="institution"
                          value={formData.institution}
                          onChange={handleChange}
                          placeholder="e.g. Model Engineering College / St. Teresa's College"
                          className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-950 border ${
                            errors.institution ? 'border-rose-500 focus:border-rose-500' : 'border-slate-300 dark:border-slate-750 focus:border-ictak-cyan'
                          } focus:outline-none text-slate-900 dark:text-white transition`}
                        />
                        {errors.institution && <span className="text-[11px] text-rose-500 font-space">{errors.institution}</span>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Highest Qualification */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="modal-amb-qual" className="text-xs font-space text-slate-700 dark:text-slate-300 font-medium">
                            Highest Qualification <span className="text-rose-500">*</span>
                          </label>
                          <select
                            id="modal-amb-qual"
                            name="highestQualification"
                            value={formData.highestQualification}
                            onChange={handleChange}
                            className={`w-full px-3 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-950 border ${
                              errors.highestQualification ? 'border-rose-500' : 'border-slate-300 dark:border-slate-750 focus:border-ictak-cyan'
                            } focus:outline-none text-slate-900 dark:text-white transition`}
                          >
                            <option value="">Select Qualification</option>
                            {qualificationOptions.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          {errors.highestQualification && <span className="text-[11px] text-rose-500 font-space">{errors.highestQualification}</span>}
                        </div>

                        {/* Stream */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="modal-amb-stream" className="text-xs font-space text-slate-700 dark:text-slate-300 font-medium">
                            Stream <span className="text-rose-500">*</span>
                          </label>
                          <select
                            id="modal-amb-stream"
                            name="stream"
                            value={formData.stream}
                            onChange={handleChange}
                            className={`w-full px-3 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-950 border ${
                              errors.stream ? 'border-rose-500' : 'border-slate-300 dark:border-slate-750 focus:border-ictak-cyan'
                            } focus:outline-none text-slate-900 dark:text-white transition`}
                          >
                            <option value="">Select Stream</option>
                            {streamOptions.map((stream) => (
                              <option key={stream} value={stream}>{stream}</option>
                            ))}
                          </select>
                          {errors.stream && <span className="text-[11px] text-rose-500 font-space">{errors.stream}</span>}
                        </div>

                        {/* Branch */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="modal-amb-branch" className="text-xs font-space text-slate-700 dark:text-slate-300 font-medium">
                            Branch / Specialization <span className="text-rose-500">*</span>
                          </label>
                          <select
                            id="modal-amb-branch"
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            className={`w-full px-3 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-950 border ${
                              errors.branch ? 'border-rose-500' : 'border-slate-300 dark:border-slate-750 focus:border-ictak-cyan'
                            } focus:outline-none text-slate-900 dark:text-white transition`}
                          >
                            <option value="">Select Branch</option>
                            {branchOptions.map((b) => (
                              <option key={b} value={b}>{b}</option>
                            ))}
                          </select>
                          {errors.branch && <span className="text-[11px] text-rose-500 font-space">{errors.branch}</span>}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: District & LSGD Information */}
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-xs font-space font-bold uppercase tracking-wider text-ictak-blue dark:text-ictak-cyan">
                        <IoLocationOutline className="text-base" />
                        Section 3: District & Local Body (LSGD) Details
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* District (First Place) */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="modal-amb-district" className="text-xs font-space text-slate-700 dark:text-slate-300 font-medium">
                            District <span className="text-rose-500">*</span>
                          </label>
                          <select
                            id="modal-amb-district"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            className={`w-full px-3 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-950 border ${
                              errors.district ? 'border-rose-500' : 'border-slate-300 dark:border-slate-750 focus:border-ictak-cyan'
                            } focus:outline-none text-slate-900 dark:text-white transition`}
                          >
                            <option value="">Select District</option>
                            {districts.map((d) => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                          {errors.district && <span className="text-[11px] text-rose-500 font-space">{errors.district}</span>}
                        </div>

                        {/* Panchayath or Municipality Dropdown */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="modal-amb-lsgd" className="text-xs font-space text-slate-700 dark:text-slate-300 font-medium">
                            Panchayath or Municipality <span className="text-rose-500">*</span>
                          </label>
                          <select
                            id="modal-amb-lsgd"
                            name="panchayathOrMunicipality"
                            value={formData.panchayathOrMunicipality}
                            onChange={handleChange}
                            className={`w-full px-3 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-950 border ${
                              errors.panchayathOrMunicipality ? 'border-rose-500' : 'border-slate-300 dark:border-slate-750 focus:border-ictak-cyan'
                            } focus:outline-none text-slate-900 dark:text-white transition`}
                          >
                            <option value="">Select Panchayath / Municipality / Corporation</option>
                            {lsgdOptions.map((group) => (
                              <optgroup key={group.category} label={group.category}>
                                {group.items.map((item) => (
                                  <option key={item} value={item}>{item}</option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                          {errors.panchayathOrMunicipality && (
                            <span className="text-[11px] text-rose-500 font-space">{errors.panchayathOrMunicipality}</span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Place */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="modal-amb-place" className="text-xs font-space text-slate-700 dark:text-slate-300 font-medium">
                            Place / Locality <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="modal-amb-place"
                            name="place"
                            value={formData.place}
                            onChange={handleChange}
                            placeholder="e.g. Kakkanad / Kaloor"
                            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-950 border ${
                              errors.place ? 'border-rose-500' : 'border-slate-300 dark:border-slate-750 focus:border-ictak-cyan'
                            } focus:outline-none text-slate-900 dark:text-white transition`}
                          />
                          {errors.place && <span className="text-[11px] text-rose-500 font-space">{errors.place}</span>}
                        </div>

                        {/* PIN Code */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="modal-amb-pin" className="text-xs font-space text-slate-700 dark:text-slate-300 font-medium">
                            PIN Code <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="modal-amb-pin"
                            name="pin"
                            maxLength={6}
                            value={formData.pin}
                            onChange={handleChange}
                            placeholder="6-digit PIN"
                            className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-950 border ${
                              errors.pin ? 'border-rose-500' : 'border-slate-300 dark:border-slate-750 focus:border-ictak-cyan'
                            } focus:outline-none text-slate-900 dark:text-white transition`}
                          />
                          {errors.pin && <span className="text-[11px] text-rose-500 font-space">{errors.pin}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-ictak-blue hover:bg-ictak-cyan text-white font-space font-semibold uppercase tracking-wider text-xs sm:text-sm rounded-xl transition-colors duration-200 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  /* SUCCESS VIEW */
                  <motion.div
                    key="registration-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-6 max-w-xl mx-auto gap-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-4xl shadow-inner border border-emerald-500/30">
                      <IoCheckmarkCircle className="animate-pulse" />
                    </div>

                    <div>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-space font-bold uppercase tracking-wider border border-emerald-500/20">
                        Registration Confirmed
                      </span>
                      <h3 className="font-space text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-2">
                        Welcome, Digital Jagratha Ambassador!
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed mt-1">
                        Congratulations <strong className="text-slate-900 dark:text-white">{formData.name}</strong>! Your official ambassador profile has been registered in the SafeTech Kerala Database.
                      </p>
                    </div>

                    {/* Official Credential Summary */}
                    <div className="w-full bg-slate-900 text-white rounded-2xl p-6 border border-ictak-cyan/30 text-left space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <div>
                          <span className="text-[10px] font-space text-ictak-cyan uppercase font-bold tracking-wider">Ambassador Profile</span>
                          <h4 className="font-space text-base font-bold">{formData.name}</h4>
                          <span className="text-xs text-slate-300">{formData.institution}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-slate-400 font-space block">AMBASSADOR ID</span>
                          <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {ambassadorId}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-space">Stream / Branch</span>
                          <span className="font-semibold text-slate-200 truncate block">{formData.branch}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-space">District</span>
                          <span className="font-semibold text-slate-200">{formData.district}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-space">Local Body (LSGD)</span>
                          <span className="font-semibold text-slate-200 truncate block">{formData.panchayathOrMunicipality}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block font-space">Place & PIN</span>
                          <span className="font-semibold text-slate-200">{formData.place}, {formData.pin}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Authenticated by Goverment of Keralam • KSITM • CYBERDOME</span>
                        <button
                          onClick={handleCopyId}
                          className="flex items-center gap-1 text-ictak-cyan hover:text-white transition cursor-pointer font-space"
                        >
                          <IoCopyOutline />
                          {copiedId ? "Copied ID!" : "Copy ID"}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
                      <button
                        onClick={handlePrintCard}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-ictak-blue to-ictak-cyan text-white text-xs font-space font-semibold uppercase tracking-wider transition hover:shadow-lg cursor-pointer flex items-center gap-2"
                      >
                        <IoDownloadOutline className="text-base" />
                        Print Confirmation
                      </button>
                      <button
                        onClick={handleClose}
                        className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-space font-semibold uppercase tracking-wider transition cursor-pointer"
                      >
                        Close Window
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
