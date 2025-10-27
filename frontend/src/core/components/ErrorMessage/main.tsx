/**
 * @component ErrorMessage
 * @summary Error message display component
 * @domain core
 * @type ui-component
 * @category feedback
 */

import type { ErrorMessageProps } from './types';

export const ErrorMessage = ({ title, message, onRetry, onBack }: ErrorMessageProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-red-100 p-3">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mb-6 text-center text-gray-600">{message}</p>
        <div className="flex gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Voltar
            </button>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex-1 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Tentar Novamente
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
