/**
 * @hook useChecklistList
 * @summary Manages checklist list with CRUD operations
 * @domain checklist
 * @type domain-hook
 * @category data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { checklistService } from '../../services/checklistService';
import type { UseChecklistListOptions, UseChecklistListReturn } from './types';
import type { Checklist } from '../../types';

export const useChecklistList = (options: UseChecklistListOptions = {}): UseChecklistListReturn => {
  const { filters = {}, enabled = true } = options;
  const queryClient = useQueryClient();
  const queryKey = ['checklists', filters];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => checklistService.list(),
    enabled,
  });

  const { mutateAsync: createChecklist, isPending: isCreating } = useMutation({
    mutationFn: checklistService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
  });

  const { mutateAsync: updateChecklist, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => checklistService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
  });

  const { mutateAsync: deleteChecklist, isPending: isDeleting } = useMutation({
    mutationFn: checklistService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
  });

  const sortedChecklists = (data || []).sort((a: Checklist, b: Checklist) => {
    if (filters.ordenacao === 'Mais antigos') {
      return new Date(a.data_criacao).getTime() - new Date(b.data_criacao).getTime();
    }
    if (filters.ordenacao === 'Alfabética (A-Z)') {
      return a.nome_checklist.localeCompare(b.nome_checklist);
    }
    if (filters.ordenacao === 'Alfabética (Z-A)') {
      return b.nome_checklist.localeCompare(a.nome_checklist);
    }
    return new Date(b.data_criacao).getTime() - new Date(a.data_criacao).getTime();
  });

  const filteredChecklists =
    filters.tipo_viagem && filters.tipo_viagem !== 'Todos'
      ? sortedChecklists.filter((c: Checklist) => c.tipo_viagem === filters.tipo_viagem)
      : sortedChecklists;

  return {
    checklists: filteredChecklists,
    isLoading,
    error: error as Error | null,
    refetch,
    createChecklist,
    updateChecklist: (id: string, data: any) => updateChecklist({ id, data }),
    deleteChecklist,
    isCreating,
    isUpdating,
    isDeleting,
  };
};
