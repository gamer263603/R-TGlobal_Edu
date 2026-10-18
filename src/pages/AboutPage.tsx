import { Award, Users, Globe2, Heart, Target, Eye, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import { Link } from '@/lib/router';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const aboutImage = 'https://images.pexels.com/photos/7972541/pexels-photo-7972541.jpeg?auto=compress&cs=tinysrgb&w=1200';
const teamImage = 'https://images.pexels.com/photos/7972966/pexels-photo-7972966.jpeg?auto=compress&cs=tinysrgb&w=1200';

const values = [
  { icon: Heart, title: 'Student-First', desc: "Every decision we make is centered around what's best for our students." },
  { icon: Award, title: 'Excellence', desc: 'We maintain the highest standards in every service we provide.' },
  { icon: Globe2, title: 'Global Perspective', desc: 'We think internationally and help students embrace global opportunities.' },
  { icon: Users, title: 'Integrity', desc: 'Honest advice and transparent processes — no hidden fees, no false promises.' },
];

const milestones = [
  { year: '2009', title: 'Founded', desc: 'Started with a small office and a big vision.' },
  { year: '2014', title: '1,000 Students', desc: 'Crossed our first major milestone of placed students.' },
  { year: '2019', title: 'Global Expansion', desc: 'Opened partner offices in 5 countries.' },
  { year: '2024', title: '10,000+ Students', desc: 'Celebrated a decade of transforming lives through education.' },
];

export function AboutPage() {
  useScrollReveal();

  return (
    <div className="pt-20 overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative py-20 bg-gradient-to-br from-blue-950 to-blue-900 text-white overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl orb-wander pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl orb-wander delay-1000 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20 animate-fade-in-down">
            <MapPin className="w-4 h-4 text-amber-300" />
            Our journey began in 2009
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up delay-200">
            About <span className="text-shimmer-gold">R&amp;T Global Education &amp; Ventures</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-400">
            For over 15 years, we've been transforming dreams of international education into reality.
          </p>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="reveal-left">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-6">
                From a Small Office to a Global Network
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                R&amp;T Global Education &amp; Ventures was founded in 2009 by a group of international education
                enthusiasts who believed that every student deserves access to world-class education,
                regardless of where they come from.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Today, we're proud to have helped over 10,000 students study in 30+ countries,
                with partnerships spanning 700+ universities worldwide. Our team of certified
                counselors brings decades of combined experience in international education.
              </p>
            </div>
            <div className="relative reveal-right">
              <img src={aboutImage} alt="Students on campus" className="rounded-2xl shadow-2xl w-full hover:scale-[1.02] transition-transform duration-700" />
              <div className="absolute -bottom-6 -right-6 bg-white text-blue-700 p-4 rounded-full shadow-xl hidden sm:flex animate-float-slow">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative reveal-left order-2 lg:order-1">
              <img src={teamImage} alt="Students collaborating" className="rounded-2xl shadow-2xl w-full hover:scale-[1.02] transition-transform duration-700" />
            </div>
            <div className="order-1 lg:order-2 reveal-right">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 group">
                  <Target className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform" />
                  <h3 className="font-bold text-slate-800 mb-2">Our Mission</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To empower students with the knowledge, guidance, and support they need to
                    achieve their international education goals.
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-500 group">
                  <Eye className="w-8 h-8 text-blue-600 mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-transform" />
                  <h3 className="font-bold text-slate-800 mb-2">Our Vision</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    To be the world's most trusted study abroad consultancy, making global
                    education accessible to all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/70 rounded-full blur-3xl animate-float-slow pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 reveal">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">What Drives Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div
                key={v.title}
                style={{ transitionDelay: `${i * 100}ms` }}
                className="reveal bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 hover:shadow-2xl hover:border-blue-200 hover:-translate-y-2 transition-all duration-500 group card-shine"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-600 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                  <v.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">{v.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= THE PATHWAY (signature animation) ================= */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">Milestones Over the Years</h2>
            <p className="text-slate-600 mt-3 max-w-xl mx-auto">
              A path drawn one step at a time — just like the journey we walk with every student.
            </p>
          </div>

          <div className="relative">
            {/* --- Desktop / tablet: SVG pathway --- */}
            <div className="hidden md:block relative">
              <svg
                className="pathway-svg absolute inset-0 w-full h-full"
                viewBox="0 0 800 900"
                preserveAspectRatio="none"
                fill="none"
                style={{ ['--path-length' as any]: 2200 }}
              >
                <path
                  d="M 400 0 C 400 80, 200 120, 200 220 C 200 320, 600 340, 600 450 C 600 560, 200 580, 200 690 C 200 800, 400 820, 400 900"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="6 10"
                />

                <path
                  className="draw-on-scroll"
                  d="M 400 0 C 400 80, 200 120, 200 220 C 200 320, 600 340, 600 450 C 600 560, 200 580, 200 690 C 200 800, 400 820, 400 900"
                  stroke="url(#pathwayGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />

                <path
                  className="flow-dashes"
                  d="M 400 0 C 400 80, 200 120, 200 220 C 200 320, 600 340, 600 450 C 600 560, 200 580, 200 690 C 200 800, 400 820, 400 900"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.7"
                />

                <defs>
                  <linearGradient id="pathwayGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="50%" stopColor="#1d4ed8" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>

                {[
                  { cx: 400, cy: 80 },
                  { cx: 200, cy: 220 },
                  { cx: 600, cy: 450 },
                  { cx: 200, cy: 690 },
                ].map((n, i) => (
                  <g
                    key={i}
                    className="pathway-node"
                    style={{
                      transformOrigin: `${n.cx}px ${n.cy}px`,
                      transitionDelay: `${0.6 + i * 0.35}s`,
                    }}
                  >
                    <circle cx={n.cx} cy={n.cy} r="14" fill="#2563eb" opacity="0.15" />
                    <circle cx={n.cx} cy={n.cy} r="9" fill="#2563eb" className="node-core" />
                    <circle cx={n.cx} cy={n.cy} r="4" fill="#ffffff" />
                  </g>
                ))}
              </svg>

              <div className="relative flex flex-col justify-between h-[900px]">
                {milestones.map((m, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <div
                      key={m.year}
                      className={`timeline-card flex ${isLeft ? 'justify-start pr-[55%]' : 'justify-end pl-[55%]'}`}
                      style={{ transitionDelay: `${0.8 + i * 0.35}s` }}
                    >
                      <div className={`bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-gray-100 max-w-sm w-full ${isLeft ? 'text-right' : 'text-left'}`}>
                        <div className="text-blue-600 font-bold text-2xl mb-2 flex items-center gap-2" style={{ justifyContent: isLeft ? 'flex-end' : 'flex-start' }}>
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                          {m.year}
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2">{m.title}</h3>
                        <p className="text-slate-600">{m.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* --- Mobile: simplified vertical pathway --- */}
            <div className="md:hidden relative pl-10">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-400 via-blue-500 to-amber-400 rounded-full" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <div
                    key={m.year}
                    style={{ transitionDelay: `${i * 120}ms` }}
                    className="timeline-card relative"
                  >
                    <span className="absolute -left-[34px] top-3 w-5 h-5 rounded-full bg-blue-500 ring-4 ring-blue-100 animate-pulse" />
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                      <div className="text-blue-600 font-bold text-xl mb-1">{m.year}</div>
                      <h3 className="font-bold text-slate-800 mb-1">{m.title}</h3>
                      <p className="text-slate-600 text-sm">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-blue-600 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-300 rounded-full blur-3xl animate-float-slow" />
        </div>
        <div className="max-w-3xl mx-auto px-4 relative reveal-scale">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Growing Family</h2>
          <p className="text-blue-100 text-lg mb-8">Let us help you write your own success story.</p>
          <Link
            to="/apply"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-xl hover:scale-105 hover:-translate-y-1 animate-pulse-glow"
          >
            Start Your Application
          </Link>
        </div>
      </section>
    </div>
  );
}