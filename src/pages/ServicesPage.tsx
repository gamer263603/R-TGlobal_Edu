import { BookOpen, FileText, Globe2, Plane, Award, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from '@/lib/router';

const services = [
  { icon: BookOpen, title: 'University Selection', desc: 'Get matched with universities that align with your academic profile, career goals, and budget. We consider rankings, location, course content, and employability.', features: ['Profile assessment', 'University shortlisting', 'Course comparison', 'Admission probability analysis'] },
  { icon: FileText, title: 'Application Processing', desc: 'Complete support through the application process — from filling forms to crafting compelling personal statements and reference letters.', features: ['Application form assistance', 'Personal statement review', 'Document checklist', 'Submission tracking'] },
  { icon: Globe2, title: 'Visa Guidance', desc: 'Comprehensive visa support including documentation, interview preparation, and submission to maximize your approval chances.', features: ['Visa documentation', 'Interview prep sessions', 'Application submission', 'Status monitoring'] },
  { icon: Award, title: 'Scholarship Assistance', desc: 'Find and apply for scholarships, grants, and financial aid. We help you identify opportunities you qualify for.', features: ['Scholarship matching', 'Essay guidance', 'Application support', 'Deadline management'] },
  { icon: Plane, title: 'Pre-Departure Support', desc: 'Everything you need before you fly — travel arrangements, accommodation, packing lists, and cultural orientation.', features: ['Flight booking guidance', 'Accommodation help', 'Pre-departure briefing', 'Packing checklist'] },
  { icon: Users, title: 'Career Counseling', desc: 'Plan your post-study career with guidance on work visas, job markets, and industry connections in your destination country.', features: ['Post-study work advice', 'Job market insights', 'Networking tips', 'Career roadmap'] },
];

const process = [
  { step: '01', title: 'Free Consultation', desc: 'Book a session with our experts to discuss your goals and options.' },
  { step: '02', title: 'Profile Evaluation', desc: 'We assess your academic background and recommend suitable universities.' },
  { step: '03', title: 'Application Submission', desc: 'We help you prepare and submit strong applications to your chosen schools.' },
  { step: '04', title: 'Offer & Visa', desc: 'Receive your offer letter, then we guide you through the visa process.' },
  { step: '05', title: 'Departure & Beyond', desc: 'Pre-departure briefing, travel arrangements, and ongoing support.' },
];

export function ServicesPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-950 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            End-to-end support for your study abroad journey — from your first question to your first day on campus.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, i) => (
              <div key={service.title} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">{service.title}</h2>
                  <p className="text-slate-600 text-lg leading-relaxed mb-6">{service.desc}</p>
                  <ul className="space-y-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-slate-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-gradient-to-br ${i % 2 === 0 ? 'from-blue-50 to-amber-50' : 'from-amber-50 to-blue-50'} rounded-3xl p-12 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <service.icon className="w-24 h-24 text-blue-300 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">Our Simple 5-Step Process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {process.map((p) => (
              <div key={p.step} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 relative">
                <div className="text-5xl font-bold text-blue-100 mb-3">{p.step}</div>
                <h3 className="font-bold text-slate-800 mb-2">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 text-lg mb-8">Fill out your application today and take the first step.</p>
          <Link to="/apply" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl">
            Apply Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}