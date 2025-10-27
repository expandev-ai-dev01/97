/**
 * @component MainLayout
 * @summary Main application layout with header and content area
 * @domain core
 * @type layout-component
 * @category layout
 */

import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-primary-600 cursor-pointer hover:text-primary-700 transition-colors"
            >
              Triplist
            </h1>
            <nav className="flex gap-4">
              <a
                href="/"
                className={`transition-colors ${
                  location.pathname === '/'
                    ? 'text-primary-600 font-medium'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                Início
              </a>
              <a
                href="/checklists"
                className={`transition-colors ${
                  location.pathname.startsWith('/checklists')
                    ? 'text-primary-600 font-medium'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                Meus Checklists
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};
