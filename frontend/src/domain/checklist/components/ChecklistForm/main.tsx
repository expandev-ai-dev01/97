/**
 * @component ChecklistForm
 * @summary Form for creating/editing checklists
 * @domain checklist
 * @type domain-component
 * @category form
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { ChecklistFormProps, ChecklistFormData } from './types';
import { TRIP_TYPES, TRIP_TYPE_LABELS } from '../../constants';

const checklistSchema = z.object({
  nome_checklist: z
    .string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(50, 'O nome deve ter no máximo 50 caracteres')
    .regex(
      /^[a-zA-Z0-9\s\-_]+$/,
      'O nome não pode conter caracteres especiais exceto hífen e underscore'
    ),
  tipo_viagem: z.enum(TRIP_TYPES as [string, ...string[]], {
    errorMap: () => ({ message: 'Selecione um tipo de viagem' }),
  }),
  descricao: z.string().max(200, 'A descrição deve ter no máximo 200 caracteres').optional(),
});

export const ChecklistForm = ({
  checklist,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ChecklistFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChecklistFormData>({
    resolver: zodResolver(checklistSchema),
    defaultValues: checklist
      ? {
          nome_checklist: checklist.nome_checklist,
          tipo_viagem: checklist.tipo_viagem,
          descricao: checklist.descricao || '',
        }
      : undefined,
  });

  const handleFormSubmit = async (data: ChecklistFormData) => {
    await onSubmit(data as any);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="nome_checklist" className="block text-sm font-medium text-gray-700 mb-2">
          Nome do Checklist *
        </label>
        <input
          {...register('nome_checklist')}
          type="text"
          id="nome_checklist"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Ex: Viagem para praia"
        />
        {errors.nome_checklist && (
          <p className="mt-1 text-sm text-red-600">{errors.nome_checklist.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tipo_viagem" className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Viagem *
        </label>
        <select
          {...register('tipo_viagem')}
          id="tipo_viagem"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">Selecione um tipo</option>
          {TRIP_TYPES.map((type) => (
            <option key={type} value={type}>
              {TRIP_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
        {errors.tipo_viagem && (
          <p className="mt-1 text-sm text-red-600">{errors.tipo_viagem.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
          Descrição (opcional)
        </label>
        <textarea
          {...register('descricao')}
          id="descricao"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Adicione detalhes sobre esta viagem..."
        />
        {errors.descricao && (
          <p className="mt-1 text-sm text-red-600">{errors.descricao.message}</p>
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
          {isSubmitting ? 'Salvando...' : checklist ? 'Atualizar' : 'Criar Checklist'}
        </button>
      </div>
    </form>
  );
};
