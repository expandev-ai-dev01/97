/**
 * @service checklistItemStatusService
 * @summary Checklist item status toggle service for authenticated endpoints
 * @domain checklist
 * @type rest-service
 * @apiContext internal
 */

import { authenticatedClient } from '@/core/lib/api';
import type { ChecklistItem } from '../types';

export const checklistItemStatusService = {
  /**
   * @endpoint PATCH /api/v1/internal/checklist-item-status/:id
   * @summary Toggles the verification status of a checklist item
   */
  async toggleStatus(id: string): Promise<ChecklistItem> {
    const response = await authenticatedClient.patch(`/checklist-item-status/${id}`);
    return response.data.data;
  },
};
