import type { ChecklistItem, CreateChecklistItemDto, UpdateChecklistItemDto } from '../../types';

export interface UseChecklistItemMutationsReturn {
  create: (data: CreateChecklistItemDto) => Promise<ChecklistItem>;
  update: (id: string, data: UpdateChecklistItemDto) => Promise<ChecklistItem>;
  remove: (id: string) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  isRemoving: boolean;
}
