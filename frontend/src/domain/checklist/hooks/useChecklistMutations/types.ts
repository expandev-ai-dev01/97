import type { Checklist, CreateChecklistDto, UpdateChecklistDto } from '../../types';

export interface UseChecklistMutationsReturn {
  create: (data: CreateChecklistDto) => Promise<Checklist>;
  update: (id: string, data: UpdateChecklistDto) => Promise<Checklist>;
  remove: (id: string) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  isRemoving: boolean;
}
