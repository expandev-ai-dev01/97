import type { ChecklistItem } from '../../types';

export interface UseChecklistItemStatusReturn {
  toggleStatus: (id: string) => Promise<ChecklistItem>;
  isToggling: boolean;
}
