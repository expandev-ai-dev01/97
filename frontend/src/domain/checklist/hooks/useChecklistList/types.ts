/**
 * @module checklist/hooks/useChecklistList/types
 * @summary Type definitions for useChecklistList hook
 */

import type { Checklist, ChecklistListParams } from '../../types';

export interface UseChecklistListOptions {
  filters?: ChecklistListParams;
  enabled?: boolean;
}

export interface UseChecklistListReturn {
  checklists: Checklist[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  createChecklist: (data: any) => Promise<Checklist>;
  updateChecklist: (id: string, data: any) => Promise<Checklist>;
  deleteChecklist: (id: string) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}
