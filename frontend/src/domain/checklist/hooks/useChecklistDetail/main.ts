/**
 * @hook useChecklistDetail
 * @summary Manages checklist detail with item operations
 * @domain checklist
 * @type domain-hook
 * @category data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { checklistService } from '../../services/checklistService';
import type { UseChecklistDetailOptions, UseChecklistDetailReturn } from './types';

export const useChecklistDetail = (
  options: UseChecklistDetailOptions
): UseChecklistDetailReturn => {
  const { checklistId, enabled = true } = options;
  const queryClient = useQueryClient();
  const queryKey = ['checklist', checklistId];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => checklistService.getById(checklistId),
    enabled: enabled && !!checklistId,
  });

  const { mutateAsync: createItem, isPending: isCreatingItem } = useMutation({
    mutationFn: checklistService.createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
  });

  const { mutateAsync: updateItem, isPending: isUpdatingItem } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => checklistService.updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
  });

  const { mutateAsync: deleteItem, isPending: isDeletingItem } = useMutation({
    mutationFn: checklistService.deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
  });

  return {
    checklist: data || null,
    items: data?.itens || [],
    isLoading,
    error: error as Error | null,
    refetch,
    createItem,
    updateItem: (id: string, data: any) => updateItem({ id, data }),
    deleteItem,
    isCreatingItem,
    isUpdatingItem,
    isDeletingItem,
  };
};
