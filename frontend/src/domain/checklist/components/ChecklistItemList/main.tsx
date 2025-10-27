/**
 * @component ChecklistItemList
 * @summary List of checklist items with status toggle and filtering
 * @domain checklist
 * @type domain-component
 * @category display
 */

import { useState, useMemo } from 'react';
import { useChecklistItemStatus } from '../../hooks/useChecklistItemStatus';
import type { ChecklistItemListProps } from './types';
import type { ItemStatus } from '../../types';

export const ChecklistItemList = ({
  items,
  onEdit,
  onDelete,
  showFilters = true,
}: ChecklistItemListProps) => {
  const { toggleStatus, isToggling } = useChecklistItemStatus();
  const [statusFilter, setStatusFilter] = useState<ItemStatus | 'Todos'>('Todos');
  const [searchText, setSearchText] = useState('');

  const filteredItems = useMemo(() => {
    let result = items;

    if (statusFilter !== 'Todos') {
      result = result.filter((item) => item.status === statusFilter);
    }

    if (searchText.trim()) {
      const search = searchText.toLowerCase();
      result = result.filter(
        (item) =>
          item.nome_item.toLowerCase().includes(search) ||
          item.observacao?.toLowerCase().includes(search)
      );
    }

    return result;
  }, [items, statusFilter, searchText]);

  const handleToggleStatus = async (itemId: string) => {
    try {
      await toggleStatus(itemId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || 'Erro ao atualizar status do item. Tente novamente.');
      }
    }
  };

  const verifiedCount = items.filter((item) => item.status === 'verificado').length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? Math.round((verifiedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="status-filter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Filtrar por Status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ItemStatus | 'Todos')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Todos">Todos</option>
                <option value="pendente">Pendentes</option>
                <option value="verificado">Verificados</option>
              </select>
            </div>

            <div>
              <label htmlFor="search-text" className="block text-sm font-medium text-gray-700 mb-2">
                Buscar Item
              </label>
              <input
                id="search-text"
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Digite para buscar..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>
                {verifiedCount} de {totalCount} itens verificados
              </span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            {searchText.trim() || statusFilter !== 'Todos'
              ? 'Nenhum item encontrado com os filtros selecionados.'
              : 'Nenhum item adicionado ainda.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-3 p-4 rounded-lg transition-all ${
                item.status === 'verificado'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <button
                onClick={() => handleToggleStatus(item.id)}
                disabled={isToggling}
                className={`flex-shrink-0 mt-1 h-6 w-6 rounded border-2 flex items-center justify-center transition-colors ${
                  item.status === 'verificado'
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 hover:border-primary-500'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label={item.status === 'verificado' ? 'Desmarcar item' : 'Marcar item'}
              >
                {item.status === 'verificado' && (
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>

              <div className="flex-1">
                <h4
                  className={`font-medium ${
                    item.status === 'verificado' ? 'text-gray-500 line-through' : 'text-gray-900'
                  }`}
                >
                  {item.nome_item}
                </h4>
                {item.observacao && (
                  <p
                    className={`text-sm mt-1 ${
                      item.status === 'verificado' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {item.observacao}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 text-gray-600 hover:text-primary-600 hover:bg-white rounded-md transition-colors"
                  aria-label="Editar item"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-white rounded-md transition-colors"
                  aria-label="Excluir item"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          ))}
        </div>
      )}
    </div>
  );
};
