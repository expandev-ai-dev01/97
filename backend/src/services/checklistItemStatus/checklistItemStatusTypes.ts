/**
 * @module services/checklistItemStatus/checklistItemStatusTypes
 * @description Type definitions for checklist item status service
 */

import { ItemStatus } from '@/constants/checklist';

/**
 * @interface ChecklistItemStatusToggleResult
 * @description Result of toggling item status
 *
 * @property {string} id - Item identifier
 * @property {string} checklist_id - Parent checklist identifier
 * @property {string} nome_item - Item name
 * @property {string | null} observacao - Optional notes
 * @property {number} ordem - Display order
 * @property {ItemStatus} status - New item status
 * @property {Date} data_atualizacao - Update timestamp
 */
export interface ChecklistItemStatusToggleResult {
  id: string;
  checklist_id: string;
  nome_item: string;
  observacao: string | null;
  ordem: number;
  status: ItemStatus;
  data_atualizacao: Date;
}
