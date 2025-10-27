/**
 * @page ChecklistListPage
 * @summary Page displaying list of user checklists with filters
 * @domain checklist
 * @type list-page
 * @category checklist-management
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChecklistList } from '@/domain/checklist/hooks/useChecklistList';
import { ChecklistCard } from '@/domain/checklist/components/ChecklistCard';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import { TRIP_TYPES, SORT_OPTIONS } from '@/domain/checklist/constants';
import type { ChecklistListParams } from '@/domain/checklist/types';

export const ChecklistListPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ChecklistListParams>({
    tipo_viagem: 'Todos',
    ordenacao: 'Mais recentes',
  });

  const { checklists, isLoading, error, deleteChecklist, isDeleting } = useChecklistList({
    filters,
  });

  const handleDelete = async (id: string) => {
    if (
      window.confirm(
        'Tem certeza que deseja excluir este checklist? Esta ação não pode ser desfeita.'
      )
    ) {
      try {
        await deleteChecklist(id);
      } catch (error: unknown) {
        alert('Erro ao excluir checklist. Tente novamente.');
      }
    }
  };

  if (error) {
    return (
      <ErrorMessage
        title="Erro ao carregar checklists"
        message="Não foi possível carregar seus checklists. Tente novamente."
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Checklists</h1>
          <p className="text-gray-600 mt-1">Gerencie suas listas de viagem</p>
        </div>
        <button
          onClick={() => navigate('/checklists/new')}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          + Novo Checklist
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="tipo_viagem" className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Viagem
            </label>
            <select
              id="tipo_viagem"
              value={filters.tipo_viagem}
              onChange={(e) => setFilters({ ...filters, tipo_viagem: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="Todos">Todos</option>
              {TRIP_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="ordenacao" className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por
            </label>
            <select
              id="ordenacao"
              value={filters.ordenacao}
              onChange={(e) => setFilters({ ...filters, ordenacao: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {checklists.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gray-100 p-3">
              <svg
                className="h-12 w-12 text-gray-400"
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
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum checklist encontrado</h3>
          <p className="text-gray-600 mb-6">
            {filters.tipo_viagem !== 'Todos'
              ? 'Nenhum checklist encontrado com os filtros selecionados.'
              : 'Você ainda não possui checklists. Crie seu primeiro checklist agora!'}
          </p>
          <button
            onClick={() => navigate('/checklists/new')}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Criar Primeiro Checklist
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {checklists.map((checklist) => (
            <ChecklistCard
              key={checklist.id}
              checklist={checklist}
              onEdit={(id) => navigate(`/checklists/${id}/edit`)}
              onDelete={handleDelete}
              onView={(id) => navigate(`/checklists/${id}`)}
            />
          ))}
        </div>
      )}

      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-700">Excluindo checklist...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistListPage;
