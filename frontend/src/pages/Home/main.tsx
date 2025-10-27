/**
 * @page HomePage
 * @summary Home page with welcome message and feature overview
 * @domain core
 * @type landing-page
 * @category public
 */

import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Bem-vindo ao Triplist</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Organize suas viagens com checklists personalizados e nunca mais esqueça nada importante.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
            <svg
              className="h-6 w-6 text-primary-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Checklists Personalizados</h3>
          <p className="text-gray-600">
            Crie listas customizadas para diferentes tipos de viagens: praia, negócios,
            internacional e muito mais.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
            <svg
              className="h-6 w-6 text-primary-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Marque Itens Verificados</h3>
          <p className="text-gray-600">
            Acompanhe seu progresso marcando os itens já separados ou empacotados para sua viagem.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
            <svg
              className="h-6 w-6 text-primary-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Organize com Facilidade</h3>
          <p className="text-gray-600">
            Interface simples e intuitiva para gerenciar todas as suas listas de viagem em um só
            lugar.
          </p>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate('/checklists')}
          className="rounded-md bg-primary-600 px-6 py-3 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Começar Agora
        </button>
      </div>
    </div>
  );
};

export default HomePage;
