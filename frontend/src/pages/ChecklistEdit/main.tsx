/**
 * @page ChecklistEditPage
 * @summary Page for editing existing checklist
 * @domain checklist
 * @type form-page
 * @category checklist-management
 */

import { useNavigate, useParams } from 'react-router-dom';
import { useChecklistDetail } from '@/domain/checklist/hooks/useChecklistDetail';
import { useChecklistList } from '@/domain/checklist/hooks/useChecklistList';
import { ChecklistForm } from '@/domain/checklist/components/ChecklistForm';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import type { UpdateChecklistDto } from '@/domain/checklist/types';

export const ChecklistEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { checklist, isLoading, error } = useChecklistDetail({ checklistId: id! });
  const { updateChecklist, isUpdating } = useChecklistList();

  const handleSubmit = async (data: UpdateChecklistDto) => {
    try {
      await updateChecklist(id!, data);
      navigate(`/checklists/${id}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || 'Erro ao atualizar checklist. Tente novamente.');
      }
    }
  };

  const handleCancel = () => {
    navigate(`/checklists/${id}`);
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
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(`/checklists/${id}`)}
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
          Voltar para detalhes
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar Checklist</h1>
        <ChecklistForm
          checklist={checklist}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isUpdating}
        />
      </div>
    </div>
  );
};

export default ChecklistEditPage;
