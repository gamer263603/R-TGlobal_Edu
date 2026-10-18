import { AuthProvider } from '@/lib/auth';
import { RouterProvider, useRouter } from '@/lib/router';
import { Navbar, Footer } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { DestinationsPage } from '@/pages/DestinationsPage';
import { ContactPage } from '@/pages/ContactPage';
import { ApplyPage } from '@/pages/ApplyPage';
import { AdminLoginPage } from '@/pages/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';

function Routes() {
  const { path } = useRouter();
  const cleanPath = path.split('?')[0];

  // Admin routes — no public navbar/footer
  if (cleanPath === '/admin') return <AdminLoginPage />;
  if (cleanPath === '/admin/dashboard') return <AdminDashboardPage />;

  // Public routes with navbar + footer
  const pages: Record<string, React.ReactNode> = {
    '/': <HomePage />,
    '/about': <AboutPage />,
    '/services': <ServicesPage />,
    '/destinations': <DestinationsPage />,
    '/contact': <ContactPage />,
    '/apply': <ApplyPage />,
  };

  const page = pages[cleanPath] || <NotFound />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{page}</main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-20">
      <h1 className="text-6xl font-bold text-teal-600 mb-4">404</h1>
      <p className="text-slate-600 text-lg mb-6">Page not found</p>
      <a href="/" className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors">
        Back to Home
      </a>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <RouterProvider>
        <Routes />
      </RouterProvider>
    </AuthProvider>
  );
}

export default App;
