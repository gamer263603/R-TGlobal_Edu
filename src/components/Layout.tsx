import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useRouter } from '@/lib/router';

const LOGO_URL =
  'https://dbzrxxwjkpbhfwhrcgxv.supabase.co/storage/v1/object/public/logosImages/logo.svg';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { path } = useRouter();

  useEffect(() => {
    const onScroll = () => {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      setScrolled(y > 20);
    };

    window.scrollTo({
      top: 0,
      behavior: 'instant' as ScrollBehavior,
    });

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    document.addEventListener('scroll', onScroll, {
      passive: true,
      capture: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);

      document.removeEventListener('scroll', onScroll, {
        capture: true,
      });
    };
  }, [path]);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-blue-950/95 backdrop-blur-md shadow-lg'
          : 'bg-blue-950/90 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[100px] md:min-h-[108px]">

          {/* =====================================================
              BRAND
          ====================================================== */}
          <Link
            to="/"
            aria-label="R&T Global - Home"
            className="flex items-center shrink-0"
          >
            <div className="relative w-[100px] h-[92px] flex items-center justify-center overflow-visible">
              <img
                src={LOGO_URL}
                alt="R&T Global Education & Ventures logo"
                className="
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  w-[150px]
                  h-[150px]
                  max-w-none
                  object-contain
                  shrink-0
                "
                onError={(e) => {
                  console.error('Logo failed to load:', LOGO_URL);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Brand text */}
            <div className="ml-1 md:ml-2 leading-none">
              <div className="text-white text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap">
              
              </div>

            
            </div>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  path === link.to
                    ? 'text-white bg-white/20'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/apply"
              className="
                ml-3
                px-6
                py-3
                bg-amber-500
                text-blue-950
                rounded-lg
                text-sm
                font-bold
                whitespace-nowrap
                shadow-md
                hover:bg-amber-400
                hover:shadow-lg
                transition-all
                duration-200
              "
            >
              Apply Now
            </Link>
          </div>

          {/* =====================================================
              MOBILE MENU BUTTON
          ====================================================== */}
          <button
            type="button"
            className="
              md:hidden
              p-2.5
              rounded-lg
              hover:bg-white/10
              transition-colors
            "
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? (
              <X className="w-7 h-7 text-white" />
            ) : (
              <Menu className="w-7 h-7 text-white" />
            )}
          </button>
        </div>

        {/* =====================================================
            MOBILE NAVIGATION
        ====================================================== */}
        {open && (
          <div className="md:hidden bg-white rounded-xl shadow-xl mt-2 mb-4 p-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  path === link.to
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/apply"
              onClick={() => setOpen(false)}
              className="
                block
                px-4
                py-3
                mt-2
                bg-blue-600
                text-white
                rounded-lg
                text-sm
                font-semibold
                text-center
                hover:bg-blue-700
                transition-colors
              "
            >
              Apply Now
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">

          {/* =====================================================
              FOOTER BRAND
          ====================================================== */}
          <div className="md:col-span-2">
            <Link
              to="/"
              aria-label="R&T Global Education & Ventures - Home"
              className="inline-flex items-center mb-6"
            >
              <div className="relative w-[90px] h-[80px] flex items-center justify-center overflow-visible">
                <img
                  src={LOGO_URL}
                  alt="R&T Global Education & Ventures logo"
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-[135px]
                    h-[135px]
                    max-w-none
                    object-contain
                  "
                  onError={(e) => {
                    console.error(
                      'Footer logo failed to load:',
                      LOGO_URL
                    );
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <div className="ml-2 leading-none">
                <div className="text-white text-xl font-bold whitespace-nowrap">
                  R&amp;T Global
                </div>

                <div className="text-amber-400 text-xs font-semibold tracking-wider mt-2 whitespace-nowrap">
                  EDUCATION &amp; VENTURES
                </div>
              </div>
            </Link>

            <p className="text-slate-400 max-w-md leading-relaxed">
              Your trusted partner for studying abroad. We guide students
              through every step — from choosing the right university to visa
              applications and beyond.
            </p>

            <p className="text-slate-500 text-sm mt-6">
              Admin portal:{' '}
              <a
                href="/admin"
                className="text-amber-400 hover:text-amber-300 underline"
              >
                Admin Login
              </a>
            </p>
          </div>

          {/* =====================================================
              QUICK LINKS
          ====================================================== */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  to="/destinations"
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Destinations
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/apply"
                  className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>

          {/* =====================================================
              CONTACT
          ====================================================== */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Get in Touch
            </h3>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>Zimbabwe</li>
              <li>Harare</li>
              <li>rtglobaleducation@gmail.com</li>
              <li>+91 70874 40095</li>
              <li>+263 71 929 7590</li>
            </ul>
          </div>
        </div>

        {/* =====================================================
            COPYRIGHT
        ====================================================== */}
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} R&amp;T Global Education &amp; Ventures. All rights reserved.
          Web Dev: Code With Ted
        </div>
      </div>
    </footer>
  );
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
