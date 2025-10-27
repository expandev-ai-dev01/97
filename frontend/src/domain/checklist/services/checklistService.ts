/**
 * @service checklistService
 * @summary Checklist management service for authenticated endpoints
 * @domain checklist
 * @type rest-service
 * @apiContext internal
 */

import { authenticatedClient } from '@/core/lib/api';
import type {
  Checklist,
  CreateChecklistDto,
  UpdateChecklistDto,
  CreateChecklistItemDto,
  UpdateChecklistItemDto,
  ChecklistItem,
} from '../types';

export const checklistService = {
  /**
   * @endpoint GET /api/v1/internal/checklist
   * @summary Fetches list of checklists with summary information
   */
  async list(): Promise<Checklist[]> {
    const response = await authenticatedClient.get('/checklist');
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/checklist/:id
   * @summary Fetches single checklist by ID with all items
   */
  async getById(id: string): Promise<Checklist> {
    const response = await authenticatedClient.get(`/checklist/${id}`);
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/internal/checklist
   * @summary Creates new checklist
   */
  async create(data: CreateChecklistDto): Promise<Checklist> {
    const response = await authenticatedClient.post('/checklist', data);
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/checklist/:id
   * @summary Updates existing checklist
   */
  async update(id: string, data: UpdateChecklistDto): Promise<Checklist> {
    const response = await authenticatedClient.put(`/checklist/${id}`, data);
    return response.data.data;
  },

  /**
   * @endpoint DELETE /api/v1/internal/checklist/:id
   * @summary Deletes checklist and all its items
   */
  async delete(id: string): Promise<void> {
    await authenticatedClient.delete(`/checklist/${id}`);
  },

  /**
   * @endpoint POST /api/v1/internal/checklist-item
   * @summary Adds item to checklist
   */
  async createItem(data: CreateChecklistItemDto): Promise<ChecklistItem> {
    const response = await authenticatedClient.post('/checklist-item', data);
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/checklist-item/:id
   * @summary Updates checklist item
   */
  async updateItem(id: string, data: UpdateChecklistItemDto): Promise<ChecklistItem> {
    const response = await authenticatedClient.put(`/checklist-item/${id}`, data);
    return response.data.data;
  },

  /**
   * @endpoint DELETE /api/v1/internal/checklist-item/:id
   * @summary Deletes checklist item
   */
  async deleteItem(id: string): Promise<void> {
    await authenticatedClient.delete(`/checklist-item/${id}`);
  },
};
