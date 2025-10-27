/**
 * @hook useChecklistItemStatus
 * @summary Hook for toggling checklist item status
 * @domain checklist
 * @type domain-hook
 * @category data
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checklistItemStatusService } from '../../services/checklistItemStatusService';
import type { UseChecklistItemStatusReturn } from './types';

export const useChecklistItemStatus = (): UseChecklistItemStatusReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync: toggleStatus, isPending: isToggling } = useMutation({
    mutationFn: checklistItemStatusService.toggleStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['checklist', data.checklist_id] });
      queryClient.invalidateQueries({ queryKey: ['checklists'] });
    },
  });

  return {
    toggleStatus,
    isToggling,
  };
};
