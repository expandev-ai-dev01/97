/**
 * @hook useChecklistItemMutations
 * @summary Hook for checklist item CRUD mutations
 * @domain checklist
 * @type domain-hook
 * @category data
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checklistItemService } from '../../services';
import type { UseChecklistItemMutationsReturn } from './types';

export const useChecklistItemMutations = (): UseChecklistItemMutationsReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync: create, isPending: isCreating } = useMutation({
    mutationFn: checklistItemService.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['checklist', data.checklist_id] });
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
  });

  const { mutateAsync: update, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => checklistItemService.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['checklist', data.checklist_id] });
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
  });

  const { mutateAsync: remove, isPending: isRemoving } = useMutation({
    mutationFn: checklistItemService.delete,
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
