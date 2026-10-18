import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, User, GraduationCap, Globe, Send, AlertCircle } from 'lucide-react';
import { Link, useRouter } from '@/lib/router';
import { supabase } from '@/lib/supabase';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  current_address: string;
  city: string;
  country: string;
  intended_country: string;
  intended_university: string;
  intended_program: string;
  intended_level: string;
  intake: string;
  current_education: string;
  institution_name: string;
  graduation_year: string;
  gpa: string;
  english_test: string;
  english_score: string;
  work_experience: string;
  funding_source: string;
  passport_number: string;
  message: string;
}

const initialData: FormData = {
  first_name: '', last_name: '', email: '', phone: '', date_of_birth: '', gender: '',
  nationality: '', current_address: '', city: '', country: '',
  intended_country: '', intended_university: '', intended_program: '', intended_level: '', intake: '',
  current_education: '', institution_name: '', graduation_year: '', gpa: '',
  english_test: '', english_score: '', work_experience: '', funding_source: '',
  passport_number: '', message: '',
};

const steps = [
  { title: 'Personal Info', icon: User, desc: 'Tell us about yourself' },
  { title: 'Study Preferences', icon: Globe, desc: 'Where do you want to study?' },
  { title: 'Academic Background', icon: GraduationCap, desc: 'Your education history' },
  { title: 'Review & Submit', icon: Send, desc: 'Confirm your details' },
];

export function ApplyPage() {
  const { navigate } = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!data.first_name.trim()) e.first_name = 'First name is required';
      if (!data.last_name.trim()) e.last_name = 'Last name is required';
      if (!data.email.trim()) e.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Invalid email address';
      if (!data.phone.trim()) e.phone = 'Phone number is required';
      if (!data.nationality.trim()) e.nationality = 'Nationality is required';
    }
    if (step === 1) {
      if (!data.intended_country.trim()) e.intended_country = 'Please select a destination country';
      if (!data.intended_program.trim()) e.intended_program = 'Please enter a program';
      if (!data.intended_level.trim()) e.intended_level = 'Please select a level';
      if (!data.intake.trim()) e.intake = 'Please select an intake';
    }
    if (step === 2) {
      if (!data.current_education.trim()) e.current_education = 'Please select your education level';
      if (!data.institution_name.trim()) e.institution_name = 'Institution name is required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from('applications').insert(data);
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : 'Failed to submit. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-20">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-10 text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Application Submitted!</h1>
          <p className="text-slate-600 text-lg mb-2 leading-relaxed">
            Thank you, {data.first_name}! Your application has been received successfully.
          </p>
          <p className="text-slate-500 mb-8">
            Our team will review your application and get back to you at <strong>{data.email}</strong> within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => { setData(initialData); setSubmitted(false); setStep(0); }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Submit Another Application
            </button>
            <Link to="/" className="px-6 py-3 bg-gray-100 text-slate-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const inputClass = 'w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all';
  const errorBorder = 'border-red-300';
  const normalBorder = 'border-gray-200';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-2';

  return (
    <div className="min-h-screen bg-gray-50 pt-28 md:pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">Student Application Form</h1>
          <p className="text-slate-600 text-lg">Fill in your details below to begin your study abroad journey.</p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center justify-between mb-10 max-w-2xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.title} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                    i <= step ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {i < step ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs mt-2 font-medium hidden sm:block ${i <= step ? 'text-blue-700' : 'text-gray-400'}`}>
                  {s.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${i < step ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{errors.submit}</span>
            </div>
          )}

          {/* Step 0: Personal Info */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-slate-800 mb-1">Personal Information</h2>
              <p className="text-slate-500 text-sm mb-6">Tell us about yourself so we can get to know you.</p>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <input className={`${inputClass} ${errors.first_name ? errorBorder : normalBorder}`} value={data.first_name} onChange={(e) => update('first_name', e.target.value)} placeholder="John" />
                  {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input className={`${inputClass} ${errors.last_name ? errorBorder : normalBorder}`} value={data.last_name} onChange={(e) => update('last_name', e.target.value)} placeholder="Doe" />
                  {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input type="email" className={`${inputClass} ${errors.email ? errorBorder : normalBorder}`} value={data.email} onChange={(e) => update('email', e.target.value)} placeholder="john@example.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input className={`${inputClass} ${errors.phone ? errorBorder : normalBorder}`} value={data.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+44 20 1234 5678" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input type="date" className={inputClass} value={data.date_of_birth} onChange={(e) => update('date_of_birth', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Gender</label>
                  <select className={inputClass} value={data.gender} onChange={(e) => update('gender', e.target.value)}>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Nationality *</label>
                <input className={`${inputClass} ${errors.nationality ? errorBorder : normalBorder}`} value={data.nationality} onChange={(e) => update('nationality', e.target.value)} placeholder="e.g., British, Indian, Nigerian" />
                {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
              </div>

              <div>
                <label className={labelClass}>Current Address</label>
                <input className={inputClass} value={data.current_address} onChange={(e) => update('current_address', e.target.value)} placeholder="Street address" />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>City</label>
                  <input className={inputClass} value={data.city} onChange={(e) => update('city', e.target.value)} placeholder="London" />
                </div>
                <div>
                  <label className={labelClass}>Country</label>
                  <input className={inputClass} value={data.country} onChange={(e) => update('country', e.target.value)} placeholder="United Kingdom" />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Study Preferences */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-slate-800 mb-1">Study Preferences</h2>
              <p className="text-slate-500 text-sm mb-6">Where would you like to study and what do you want to study?</p>

              <div>
                <label className={labelClass}>Preferred Destination Country *</label>
                <select className={`${inputClass} ${errors.intended_country ? errorBorder : normalBorder}`} value={data.intended_country} onChange={(e) => update('intended_country', e.target.value)}>
                  <option value="">Select a country</option>
                  <option>India</option>
                  <option>China</option>
                  <option>Poland</option>
                  <option>Other</option>
                </select>
                {errors.intended_country && <p className="text-red-500 text-xs mt-1">{errors.intended_country}</p>}
              </div>

              <div>
                <label className={labelClass}>Preferred University</label>
                <input className={inputClass} value={data.intended_university} onChange={(e) => update('intended_university', e.target.value)} placeholder="e.g., University of Warsaw (optional)" />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Preferred Program *</label>
                  <input className={`${inputClass} ${errors.intended_program ? errorBorder : normalBorder}`} value={data.intended_program} onChange={(e) => update('intended_program', e.target.value)} placeholder="e.g., Computer Science" />
                  {errors.intended_program && <p className="text-red-500 text-xs mt-1">{errors.intended_program}</p>}
                </div>
                <div>
                  <label className={labelClass}>Study Level *</label>
                  <select className={`${inputClass} ${errors.intended_level ? errorBorder : normalBorder}`} value={data.intended_level} onChange={(e) => update('intended_level', e.target.value)}>
                    <option value="">Select level</option>
                    <option>Bachelor's / Undergraduate</option><option>Master's / Postgraduate</option>
                    <option>PhD / Doctorate</option><option>Diploma / Certificate</option><option>Foundation Year</option>
                  </select>
                  {errors.intended_level && <p className="text-red-500 text-xs mt-1">{errors.intended_level}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass}>Preferred Intake *</label>
                <select className={`${inputClass} ${errors.intake ? errorBorder : normalBorder}`} value={data.intake} onChange={(e) => update('intake', e.target.value)}>
                  <option value="">Select intake</option>
                  <option>Spring 2026 (January)</option><option>Summer 2026 (May)</option>
                  <option>Fall 2026 (September)</option><option>Spring 2027 (January)</option>
                  <option>Fall 2027 (September)</option><option>Undecided</option>
                </select>
                {errors.intake && <p className="text-red-500 text-xs mt-1">{errors.intake}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Academic Background */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-slate-800 mb-1">Academic Background</h2>
              <p className="text-slate-500 text-sm mb-6">Tell us about your education and qualifications.</p>

              <div>
                <label className={labelClass}>Highest Qualification *</label>
                <select className={`${inputClass} ${errors.current_education ? errorBorder : normalBorder}`} value={data.current_education} onChange={(e) => update('current_education', e.target.value)}>
                  <option value="">Select qualification</option>
                  <option>High School / A-Levels</option><option>Diploma</option>
                  <option>Bachelor's Degree</option><option>Master's Degree</option>
                  <option>Other</option>
                </select>
                {errors.current_education && <p className="text-red-500 text-xs mt-1">{errors.current_education}</p>}
              </div>

              <div>
                <label className={labelClass}>Institution Name *</label>
                <input className={`${inputClass} ${errors.institution_name ? errorBorder : normalBorder}`} value={data.institution_name} onChange={(e) => update('institution_name', e.target.value)} placeholder="e.g., University of Warsaw" />
                {errors.institution_name && <p className="text-red-500 text-xs mt-1">{errors.institution_name}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Graduation Year</label>
                  <input className={inputClass} value={data.graduation_year} onChange={(e) => update('graduation_year', e.target.value)} placeholder="e.g., 2024" />
                </div>
                <div>
                  <label className={labelClass}>GPA / Score</label>
                  <input className={inputClass} value={data.gpa} onChange={(e) => update('gpa', e.target.value)} placeholder="e.g., 3.8 / 4.0 or 85%" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>English Proficiency Test</label>
                  <select className={inputClass} value={data.english_test} onChange={(e) => update('english_test', e.target.value)}>
                    <option value="">Select test</option>
                    <option>IELTS</option><option>TOEFL</option><option>PTE Academic</option>
                    <option>Duolingo English Test</option><option>Cambridge English</option><option>Not taken yet</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>English Test Score</label>
                  <input className={inputClass} value={data.english_score} onChange={(e) => update('english_score', e.target.value)} placeholder="e.g., 7.5 IELTS" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Work Experience (years)</label>
                  <input className={inputClass} value={data.work_experience} onChange={(e) => update('work_experience', e.target.value)} placeholder="e.g., 2" />
                </div>
                <div>
                  <label className={labelClass}>Funding Source</label>
                  <select className={inputClass} value={data.funding_source} onChange={(e) => update('funding_source', e.target.value)}>
                    <option value="">Select source</option>
                    <option>Self-funded</option><option>Parents / Family</option>
                    <option>Scholarship</option><option>Education Loan</option><option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Passport Number (if available)</label>
                <input className={inputClass} value={data.passport_number} onChange={(e) => update('passport_number', e.target.value)} placeholder="e.g., 123456789" />
              </div>

              <div>
                <label className={labelClass}>Additional Message</label>
                <textarea rows={4} className={inputClass} value={data.message} onChange={(e) => update('message', e.target.value)} placeholder="Anything else we should know? (optional)" />
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-slate-800 mb-1">Review Your Application</h2>
              <p className="text-slate-500 text-sm mb-6">Please confirm your details before submitting.</p>

              <div className="space-y-6">
                <ReviewSection title="Personal Information" items={[
                  ['Name', `${data.first_name} ${data.last_name}`],
                  ['Email', data.email],
                  ['Phone', data.phone],
                  ['Date of Birth', data.date_of_birth || '—'],
                  ['Gender', data.gender || '—'],
                  ['Nationality', data.nationality],
                  ['Address', [data.current_address, data.city, data.country].filter(Boolean).join(', ') || '—'],
                ]} onEdit={() => setStep(0)} />

                <ReviewSection title="Study Preferences" items={[
                  ['Destination', data.intended_country],
                  ['University', data.intended_university || '—'],
                  ['Program', data.intended_program],
                  ['Level', data.intended_level],
                  ['Intake', data.intake],
                ]} onEdit={() => setStep(1)} />

                <ReviewSection title="Academic Background" items={[
                  ['Qualification', data.current_education],
                  ['Institution', data.institution_name],
                  ['Graduation Year', data.graduation_year || '—'],
                  ['GPA / Score', data.gpa || '—'],
                  ['English Test', data.english_test || '—'],
                  ['English Score', data.english_score || '—'],
                  ['Work Experience', data.work_experience || '—'],
                  ['Funding Source', data.funding_source || '—'],
                  ['Passport Number', data.passport_number || '—'],
                ]} onEdit={() => setStep(2)} />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
            {step > 0 ? (
              <button onClick={prev} className="flex items-center gap-2 px-5 py-3 text-slate-600 font-medium hover:bg-gray-100 rounded-xl transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <Link to="/" className="flex items-center gap-2 px-5 py-3 text-slate-600 font-medium hover:bg-gray-100 rounded-xl transition-colors">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link> }

            {step < steps.length - 1 ? (
              <button onClick={next} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Application'} <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewSection({ title, items, onEdit }: { title: string; items: [string, string][]; onEdit: () => void }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800">{title}</h3>
        <button onClick={onEdit} className="text-blue-600 text-sm font-medium hover:text-blue-700">Edit</button>
      </div>
      <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
        {items.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</dt>
            <dd className="text-slate-700 text-sm mt-0.5">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
