/**
 * @component MainLayout
 * @summary Main application layout with header and content area
 * @domain core
 * @type layout-component
 * @category layout
 */

import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary-600">Triplist</h1>
            <nav className="flex gap-4">
              <a href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                Início
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
