/**
 * @component ChecklistItemForm
 * @summary Form for creating/editing checklist items
 * @domain checklist
 * @type domain-component
 * @category form
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { ChecklistItemFormProps, ChecklistItemFormData } from './types';

const itemSchema = z.object({
  nome_item: z
    .string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),
  observacao: z.string().max(200, 'A observação deve ter no máximo 200 caracteres').optional(),
});

export const ChecklistItemForm = ({
  checklistId,
  item,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ChecklistItemFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChecklistItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: item
      ? {
          nome_item: item.nome_item,
          observacao: item.observacao || '',
        }
      : undefined,
  });

  const handleFormSubmit = async (data: ChecklistItemFormData) => {
    await onSubmit({
      checklist_id: checklistId,
      ...data,
    } as any);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="nome_item" className="block text-sm font-medium text-gray-700 mb-2">
          Nome do Item *
        </label>
        <input
          {...register('nome_item')}
          type="text"
          id="nome_item"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Ex: Protetor solar"
        />
        {errors.nome_item && (
          <p className="mt-1 text-sm text-red-600">{errors.nome_item.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="observacao" className="block text-sm font-medium text-gray-700 mb-2">
          Observação (opcional)
        </label>
        <textarea
          {...register('observacao')}
          id="observacao"
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Adicione notas sobre este item..."
        />
        {errors.observacao && (
          <p className="mt-1 text-sm text-red-600">{errors.observacao.message}</p>
        )}
      </div>

      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Salvando...' : item ? 'Atualizar' : 'Adicionar Item'}
        </button>
      </div>
    </form>
  );
};
