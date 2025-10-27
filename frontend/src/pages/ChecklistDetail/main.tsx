/**
 * @page ChecklistDetailPage
 * @summary Page displaying checklist details with items and status toggle
 * @domain checklist
 * @type detail-page
 * @category checklist-management
 */

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useChecklistDetail } from '@/domain/checklist/hooks/useChecklistDetail';
import { useChecklistList } from '@/domain/checklist/hooks/useChecklistList';
import { ChecklistItemForm } from '@/domain/checklist/components/ChecklistItemForm';
import { ChecklistItemList } from '@/domain/checklist/components/ChecklistItemList';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import { TRIP_TYPE_LABELS } from '@/domain/checklist/constants';
import type { ChecklistItem } from '@/domain/checklist/types';

export const ChecklistDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showItemForm, setShowItemForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ChecklistItem | null>(null);

  const {
    checklist,
    items,
    isLoading,
    error,
    createItem,
    updateItem,
    deleteItem,
    isCreatingItem,
    isUpdatingItem,
    isDeletingItem,
  } = useChecklistDetail({ checklistId: id! });

  const { deleteChecklist } = useChecklistList();

  const handleDeleteChecklist = async () => {
    if (
      window.confirm(
        'Tem certeza que deseja excluir este checklist? Todos os itens também serão excluídos. Esta ação não pode ser desfeita.'
      )
    ) {
      try {
        await deleteChecklist(id!);
        navigate('/checklists');
      } catch (error: unknown) {
        alert('Erro ao excluir checklist. Tente novamente.');
      }
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        await deleteItem(itemId);
      } catch (error: unknown) {
        alert('Erro ao excluir item. Tente novamente.');
      }
    }
  };

  const handleSubmitItem = async (data: any) => {
    try {
      if (editingItem) {
        await updateItem(editingItem.id, data);
      } else {
        await createItem(data);
      }
      setShowItemForm(false);
      setEditingItem(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || 'Erro ao salvar item. Tente novamente.');
      }
    }
  };

  const handleCancelItemForm = () => {
    setShowItemForm(false);
    setEditingItem(null);
  };

  const handleEditItem = (item: ChecklistItem) => {
    setEditingItem(item);
    setShowItemForm(true);
  };

  if (error) {
    return (
      <ErrorMessage
        title="Erro ao carregar checklist"
        message="Não foi possível carregar o checklist. Tente novamente."
        onBack={() => navigate('/checklists')}
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

  if (!checklist) {
    return (
      <ErrorMessage
        title="Checklist não encontrado"
        message="O checklist que você está procurando não existe."
        onBack={() => navigate('/checklists')}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/checklists')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar para lista
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{checklist.nome_checklist}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 font-medium">
                {TRIP_TYPE_LABELS[checklist.tipo_viagem]}
              </span>
              <span>
                Criado em {format(new Date(checklist.data_criacao), 'dd/MM/yyyy', { locale: ptBR })}
              </span>
            </div>
            {checklist.descricao && <p className="mt-4 text-gray-700">{checklist.descricao}</p>}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/checklists/${id}/edit`)}
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
              onClick={handleDeleteChecklist}
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
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Itens do Checklist</h2>
          <button
            onClick={() => setShowItemForm(true)}
            disabled={items.length >= 50}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Adicionar Item
          </button>
        </div>

        {showItemForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingItem ? 'Editar Item' : 'Novo Item'}
            </h3>
            <ChecklistItemForm
              checklistId={id!}
              item={editingItem || undefined}
              onSubmit={handleSubmitItem}
              onCancel={handleCancelItemForm}
              isSubmitting={isCreatingItem || isUpdatingItem}
            />
          </div>
        )}

        {items.length === 0 ? (
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum item adicionado</h3>
            <p className="text-gray-600 mb-6">
              Este checklist ainda não possui itens. Adicione seu primeiro item agora!
            </p>
            <button
              onClick={() => setShowItemForm(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Adicionar Primeiro Item
            </button>
          </div>
        ) : (
          <ChecklistItemList
            items={items}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
            showFilters={true}
          />
        )}
      </div>

      {isDeletingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-700">Excluindo item...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistDetailPage;
