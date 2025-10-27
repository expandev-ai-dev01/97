/**
 * @module checklist/hooks/useChecklistDetail/types
 * @summary Type definitions for useChecklistDetail hook
 */

import type { Checklist, ChecklistItem } from '../../types';

export interface UseChecklistDetailOptions {
  checklistId: string;
  enabled?: boolean;
}

export interface UseChecklistDetailReturn {
  checklist: Checklist | null;
  items: ChecklistItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  createItem: (data: any) => Promise<ChecklistItem>;
  updateItem: (id: string, data: any) => Promise<ChecklistItem>;
  deleteItem: (id: string) => Promise<void>;
  isCreatingItem: boolean;
  isUpdatingItem: boolean;
  isDeletingItem: boolean;
}
