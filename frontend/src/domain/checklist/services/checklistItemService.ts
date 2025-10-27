/**
 * @service checklistItemService
 * @summary Checklist item management service for authenticated endpoints
 * @domain checklist
 * @type rest-service
 * @apiContext internal
 */

import { authenticatedClient } from '@/core/lib/api';
import type { ChecklistItem, CreateChecklistItemDto, UpdateChecklistItemDto } from '../types';

export const checklistItemService = {
  /**
   * @endpoint POST /api/v1/internal/checklist-item
   * @summary Creates new checklist item
   */
  async create(data: CreateChecklistItemDto): Promise<ChecklistItem> {
    const response = await authenticatedClient.post('/checklist-item', data);
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/checklist-item/:id
   * @summary Updates existing checklist item
   */
  async update(id: string, data: UpdateChecklistItemDto): Promise<ChecklistItem> {
    const response = await authenticatedClient.put(`/checklist-item/${id}`, data);
    return response.data.data;
  },

  /**
   * @endpoint DELETE /api/v1/internal/checklist-item/:id
   * @summary Deletes checklist item
   */
  async delete(id: string): Promise<void> {
    await authenticatedClient.delete(`/checklist-item/${id}`);
  },
};
