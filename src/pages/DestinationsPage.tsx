const destinations = [
  {
    country: 'India',
    flag: '🇮🇳',
    unis: '900+ Universities',
    desc: "One of the fastest-growing education hubs in Asia, known for elite engineering and medical institutes, affordable education, and a vibrant cultural experience. India offers excellent value for international students.",
    highlights: [
      'ICCR Scholarship — 50% to 100% tuition covered',
      'Affordable tuition and living costs',
      'World-renowned IITs and IIMs',
      'English-taught programs',
    ],
    popular: ['New Delhi', 'Mumbai', 'Bangalore', 'Pune'],
  },
  {
    country: 'China',
    flag: '🇨🇳',
    unis: '500+ Universities',
    desc: "A rising global education powerhouse offering affordable tuition, world-class STEM programs, and generous government scholarships. China is home to some of Asia's top-ranked universities and a rapidly growing innovation ecosystem.",
    highlights: [
      'Chinese Government Scholarship (CSC) — up to 100% funded',
      'Affordable tuition and living costs',
      'Strong STEM and business programs',
      'Belt and Road scholarship opportunities',
    ],
    popular: ['Beijing', 'Shanghai', 'Guangzhou', 'Hangzhou'],
  },
  {
    country: 'Poland',
    flag: '🇵🇱',
    unis: '400+ Universities',
    desc: "A hidden gem in the heart of Europe, Poland offers high-quality education at a fraction of Western European costs. With a rich history, growing economy, and English-taught programs, it's an increasingly popular destination for international students.",
    highlights: [
      '50% to 100% scholarship opportunities',
      'Affordable tuition and living costs',
      'English-taught programs in EU',
      'Schengen Area access',
      'Strong engineering and IT programs',
    ],
    popular: ['Warsaw', 'Kraków', 'Wrocław', 'Gdańsk'],
  },
];

export function DestinationsPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-blue-950 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/10 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Study Destinations</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Explore our top study destinations. Each country offers unique opportunities
            for international students.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400/20 backdrop-blur-sm border border-amber-400/40 rounded-full text-amber-200 text-sm font-semibold">
            <span className="text-lg">🎓</span>
            50%–100% Scholarship Opportunities Available
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {destinations.map((dest) => (
              <div
                key={dest.country}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 flex items-center gap-4">
                  <span className="text-5xl">{dest.flag}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{dest.country}</h2>
                    <p className="text-blue-100">{dest.unis}</p>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-slate-600 leading-relaxed mb-6">{dest.desc}</p>

                  <div className="mb-6">
                    <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">Key Highlights</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {dest.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-slate-700">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">Popular Cities</h3>
                    <div className="flex flex-wrap gap-2">
                      {dest.popular.map((city) => (
                        <span key={city} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 50%–100% Scholarship Highlight Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-blue-50 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-amber-200/40 blur-3xl rounded-full" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/20 border border-amber-400/40 rounded-full text-amber-700 text-sm font-semibold mb-6">
            <span className="text-lg">💰</span> 50%–100% Funded Opportunities
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
            50%–100% Scholarships Available
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg mb-10">
            Study abroad with reduced or zero tuition fees. Our partner countries offer
            scholarships covering 50% to 100% of tuition and living expenses.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { country: 'China', flag: '🇨🇳', scheme: 'CSC Government Scholarship', detail: 'Full tuition + living stipend + accommodation (up to 100%)' },
              { country: 'India', flag: '🇮🇳', scheme: 'ICCR Scholarship', detail: '50% to 100% tuition + housing/hostel' },
              { country: 'Poland', flag: '🇵🇱', scheme: 'NAWA Scholarship', detail: '50% to 100% tuition + job salary' },
            ].map((s) => (
              <div key={s.country} className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="text-4xl mb-3">{s.flag}</div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">{s.country}</h3>
                <p className="text-blue-700 font-semibold text-sm mb-2">{s.scheme}</p>
                <p className="text-slate-600 text-sm">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
