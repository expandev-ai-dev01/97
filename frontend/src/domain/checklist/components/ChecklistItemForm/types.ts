/**
 * @module checklist/components/ChecklistItemForm/types
 * @summary Type definitions for ChecklistItemForm component
 */

import type { ChecklistItem, CreateChecklistItemDto } from '../../types';

export interface ChecklistItemFormProps {
  checklistId: string;
  item?: ChecklistItem;
  onSubmit: (data: CreateChecklistItemDto) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export interface ChecklistItemFormData {
  nome_item: string;
  observacao?: string;
}
