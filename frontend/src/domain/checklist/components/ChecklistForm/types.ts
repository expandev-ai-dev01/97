/**
 * @module checklist/components/ChecklistForm/types
 * @summary Type definitions for ChecklistForm component
 */

import type { Checklist, CreateChecklistDto } from '../../types';

export interface ChecklistFormProps {
  checklist?: Checklist;
  onSubmit: (data: CreateChecklistDto) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export interface ChecklistFormData {
  nome_checklist: string;
  tipo_viagem: string;
  descricao?: string;
}
