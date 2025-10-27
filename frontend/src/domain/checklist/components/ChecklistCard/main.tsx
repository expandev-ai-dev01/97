/**
 * @component ChecklistCard
 * @summary Card displaying checklist summary with actions
 * @domain checklist
 * @type domain-component
 * @category display
 */

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { ChecklistCardProps } from './types';
import { TRIP_TYPE_LABELS } from '../../constants';

export const ChecklistCard = ({ checklist, onEdit, onDelete, onView }: ChecklistCardProps) => {
  const progress = checklist.progresso || 0;
  const totalItems = checklist.total_itens || 0;
  const verifiedItems = checklist.itens_verificados || 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{checklist.nome_checklist}</h3>
          <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700">
            {TRIP_TYPE_LABELS[checklist.tipo_viagem]}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(checklist.id)}
            className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Editar checklist"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(checklist.id)}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            aria-label="Excluir checklist"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {checklist.descricao && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{checklist.descricao}</p>
      )}

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>
            {verifiedItems} de {totalItems} itens
          </span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Criado em {format(new Date(checklist.data_criacao), 'dd/MM/yyyy', { locale: ptBR })}
        </span>
        <button
          onClick={() => onView(checklist.id)}
          className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          Ver detalhes →
        </button>
      </div>
    </div>
  );
};
