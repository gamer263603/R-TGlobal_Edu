import { GraduationCap, Plane, Globe2, Users, ArrowRight, Award, BookOpen, FileText, CheckCircle2, Quote, Sparkles, Star, Zap, Trophy } from 'lucide-react';
import { Link } from '@/lib/router';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const heroImage = 'https://images.pexels.com/photos/31039051/pexels-photo-31039051.jpeg?auto=compress&cs=tinysrgb&w=1920';
const aboutImage = 'https://images.pexels.com/photos/8199762/pexels-photo-8199762.jpeg?auto=compress&cs=tinysrgb&w=1200';
const rtLogo = 'https://dbzrxxwjkpbhfwhrcgxv.supabase.co/storage/v1/object/public/logosImages/logo.svg';

const destinations = [
  { country: 'India', flag: '🇮🇳', unis: '900+ Universities', desc: 'Elite IITs and IIMs, ICCR scholarships (50%–100%), and affordable English-taught programs.' },
  { country: 'China', flag: '🇨🇳', unis: '500+ Universities', desc: '100% fully funded CSC scholarships, affordable tuition, and a booming innovation ecosystem.' },
  { country: 'Poland', flag: '🇵🇱', unis: '400+ Universities', desc: '50%–100% scholarships, affordable EU education, and strong engineering programs.' },
];

const services = [
  { icon: GraduationCap, title: 'University Applications', desc: 'Expert guidance to shortlist and apply to the right universities worldwide.' },
  { icon: FileText, title: 'Visa Assistance', desc: 'End-to-end visa documentation and interview preparation with a 98% success rate.' },
  { icon: Award, title: 'Scholarship Guidance', desc: 'Access to fully funded CSC scholarships, plus 50%–100% funded ICCR and NAWA awards.' },
  { icon: BookOpen, title: 'Test Preparation', desc: 'Coaching for IELTS, TOEFL, GRE, GMAT, and SAT to maximize your scores.' },
  { icon: Plane, title: 'Pre-Departure Support', desc: 'Travel, accommodation, and cultural orientation for a smooth transition.' },
  { icon: Users, title: 'Career Counseling', desc: 'Personalized career mapping to align your studies with your goals.' },
];

const testimonials = [
  { name: 'Aisha Khan', role: 'MSc Computer Science, University of Toronto', text: 'R&T Global Education guided me through every step — from shortlisting programs to my visa approval. I even received a fully funded scholarship!' },
  { name: 'Rohan Mehta', role: 'BEng Mechanical, Warsaw University of Technology', text: 'I never thought studying in Poland with a 75% scholarship was possible. Their team helped me secure funding and a place at my dream university.' },
  { name: 'Sofia Martinez', role: 'MBA, University of Melbourne', text: 'The personalized counseling was incredible. My counselor knew exactly which universities fit my profile and budget.' },
];

const stats = [
  { value: '10,000+', label: 'Students Placed' },
  { value: '700+', label: 'Partner Universities' },
  { value: '98%', label: 'Visa Success Rate' },
  { value: '15+', label: 'Years of Experience' },
];

const scholarships = [
  { country: 'China', flag: '🇨🇳', name: 'CSC Government Scholarship', badge: '100% Funded', perks: ['Full Tuition', 'Job Stipend', 'Accommodation'] },
  { country: 'India', flag: '🇮🇳', name: 'ICCR Scholarship', badge: '50%–100% Funded', perks: ['50%–100% Tuition', 'Housing / Hostel', 'Monthly Allowance'] },
  { country: 'Poland', flag: '🇵🇱', name: 'Banach NAWA', badge: '50%–100% Funded', perks: ['50%–100% Tuition', 'Job Stipend', 'Travel Grant'] },
];

export function HomePage() {
  useScrollReveal();

  return (
    <div className="overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="University campus"
            className="w-full h-full object-cover animate-zoom-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-900/80 to-blue-950/85" />
        </div>

        {/* Animated grid overlay for a modern look */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* Floating decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 blur-3xl animate-blob pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400/10 blur-3xl animate-blob delay-1000 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20 animate-fade-in-down animate-pulse-glow">
            <GraduationCap className="w-4 h-4 animate-float" />
            Trusted by 10,000+ students worldwide
          </div>

          {/* Headline with staggered reveal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up delay-200">
            Your Gateway to <br className="hidden md:block" />
            <span className="text-shimmer-gold">Global Education</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up delay-400">
            Study abroad with confidence. Expert guidance for university applications, visas,
            and <span className="text-amber-300 font-semibold">100% &amp; 50%–100% scholarships</span> — everything in between.
          </p>

          {/* Quick trust chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-in-up delay-500">
            {['🇨🇳 100% CSC Scholarships', '🇮🇳 ICCR Grants', '🇵🇱 NAWA Awards', '🇪🇺 Schengen Access'].map((chip) => (
              <span
                key={chip}
                className="px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-white/85 text-sm font-medium"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
            <Link
              to="/apply"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-500 transition-all shadow-xl hover:shadow-blue-500/50 hover:scale-105 hover:-translate-y-1"
            >
              Start Your Application
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5 animate-bounce-arrow" />
            </Link>
            <Link
              to="/destinations"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/20 hover:scale-105 hover:-translate-y-1"
            >
              Explore Destinations
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-fade-in-down delay-500" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-950 to-transparent h-32" />
      </section>

      {/* ================= STATS ================= */}
      <section className="bg-blue-950 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/0 via-blue-800/10 to-blue-900/0 animate-gradient pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className={`text-center reveal-scale delay-${(i + 1) * 100}`}>
                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2 hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-blue-300 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SCHOLARSHIPS ================= */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200/40 blur-3xl rounded-full animate-float-slow pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-200/40 blur-3xl rounded-full animate-float pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 reveal">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/20 border border-amber-400/40 rounded-full text-amber-700 text-sm font-semibold mb-4">
              <Trophy className="w-4 h-4" /> Up to 100% Funded
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mt-2 mb-4">
              100% &amp; 50%–100% Scholarships. <span className="text-blue-600">Big Savings.</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              We help you secure government scholarships covering up to 100% of tuition, living
              expenses, and accommodation — so finances never stand between you and your dream.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {scholarships.map((s, i) => (
              <div
                key={s.country}
                style={{ transitionDelay: `${i * 100}ms` }}
                className="reveal group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-amber-100 hover:border-amber-300 hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{s.flag}</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    {s.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{s.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-4">{s.country}</p>
                <ul className="space-y-2">
                  {s.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <Link
              to="/apply"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-950 text-white rounded-xl font-semibold hover:bg-blue-900 transition-all hover:scale-105 hover:-translate-y-1 shadow-lg"
            >
              Check Your Scholarship Eligibility
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl animate-float-slow pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 reveal">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">What We Do</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mt-2 mb-4">
              Comprehensive Study Abroad Services
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              From your first consultation to landing at your destination, we're with you every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={service.title}
                style={{ transitionDelay: `${i * 90}ms` }}
                className="reveal bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100 hover:border-blue-200 hover:-translate-y-2 card-shine"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                  <service.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mt-2 mb-6">
                Empowering Students Since 2009
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                R&T Global Education & Ventures has been a leader in international education consulting for over
                15 years. Our experienced counselors have helped thousands of students find their
                ideal universities across the globe — including 100% funded opportunities in
                China and 50%–100% funded opportunities in India and Poland.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Certified education consultants',
                  'Partnerships with 700+ universities worldwide',
                  'Personalized counseling for every student',
                  'End-to-end support from application to arrival',
                ].map((item, i) => (
                  <li
                    key={item}
                    style={{ transitionDelay: `${i * 120}ms` }}
                    className="flex items-start gap-3 reveal"
                  >
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>

            <div className="relative reveal-right">
              <img
                src={aboutImage}
                alt="Students studying in library"
                className="rounded-2xl shadow-2xl w-full hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-xl shadow-xl hidden sm:block animate-float">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm text-blue-100">Visa Success Rate</div>
              </div>

              {/* R&T Logo Badge */}
              <div className="absolute -top-4 -right-4 shadow-xl hidden sm:flex items-center justify-center animate-float-slow w-16 h-16 bg-white rounded-full p-1">
                <img
                  src={rtLogo}
                  alt="R&T Global Education & Ventures Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DESTINATIONS ================= */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-100/70 rounded-full blur-3xl animate-float-slow pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 reveal">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Where You Can Go</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mt-2 mb-4">
              Popular Study Destinations
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Explore our top study destinations — China (100% funded), India and Poland (50%–100% scholarships).
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, i) => (
              <div
                key={dest.country}
                style={{ transitionDelay: `${i * 80}ms` }}
                className="reveal bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 group hover:-translate-y-2 card-shine"
              >
                <div className="text-4xl mb-4 inline-block group-hover:scale-125 group-hover:-rotate-6 transition-transform duration-500">
                  {dest.flag}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">
                  {dest.country}
                </h3>
                <p className="text-blue-600 text-sm font-medium mb-3">{dest.unis}</p>
                <p className="text-slate-600">{dest.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <Link
              to="/destinations"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all hover:scale-105 hover:-translate-y-1 shadow-lg"
            >
              View All Destinations
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Success Stories</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mt-2 mb-4">
              What Our Students Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                style={{ transitionDelay: `${i * 120}ms` }}
                className="reveal bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-10 h-10 text-blue-200 mb-4 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-500" />
                <p className="text-slate-700 leading-relaxed mb-6">{t.text}</p>
                <div>
                  <div className="font-bold text-slate-800">{t.name}</div>
                  <div className="text-sm text-blue-600">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-300 rounded-full blur-3xl animate-float-slow" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal-scale">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 border border-white/25">
            <Zap className="w-4 h-4" /> Limited scholarship slots available
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Take the first step toward your global education today. Fill out your application
            and our team will get back to you within 48 hours.
          </p>
          <Link
            to="/apply"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:scale-105 hover:-translate-y-1 animate-pulse-glow"
          >
            Apply Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
