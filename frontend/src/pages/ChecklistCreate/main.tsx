/**
 * @page ChecklistCreatePage
 * @summary Page for creating new checklist
 * @domain checklist
 * @type form-page
 * @category checklist-management
 */

import { useNavigate } from 'react-router-dom';
import { useChecklistList } from '@/domain/checklist/hooks/useChecklistList';
import { ChecklistForm } from '@/domain/checklist/components/ChecklistForm';
import type { CreateChecklistDto } from '@/domain/checklist/types';

export const ChecklistCreatePage = () => {
  const navigate = useNavigate();
  const { createChecklist, isCreating } = useChecklistList();

  const handleSubmit = async (data: CreateChecklistDto) => {
    try {
      const newChecklist = await createChecklist(data);
      navigate(`/checklists/${newChecklist.id}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message || 'Erro ao criar checklist. Tente novamente.');
      }
    }
  };

  const handleCancel = () => {
    navigate('/checklists');
  };

  return (
    <div className="max-w-2xl mx-auto">
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Criar Novo Checklist</h1>
        <ChecklistForm onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isCreating} />
      </div>
    </div>
  );
};

export default ChecklistCreatePage;
