/**
 * @hook useChecklistMutations
 * @summary Hook for checklist CRUD mutations
 * @domain checklist
 * @type domain-hook
 * @category data
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checklistService } from '../../services';
import type { UseChecklistMutationsReturn } from './types';

export const useChecklistMutations = (): UseChecklistMutationsReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync: create, isPending: isCreating } = useMutation({
    mutationFn: checklistService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
  });

  const { mutateAsync: update, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => checklistService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
      queryClient.invalidateQueries({ queryKey: ['checklist', variables.id] });
    },
  });

  const { mutateAsync: remove, isPending: isRemoving } = useMutation({
    mutationFn: checklistService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
  });

  return {
    create,
    update: (id, data) => update({ id, data }),
    remove,
    isCreating,
    isUpdating,
    isRemoving,
  };
};
