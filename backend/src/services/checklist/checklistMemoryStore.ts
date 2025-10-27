/**
 * @module services/checklist/checklistMemoryStore
 * @description Centralized in-memory storage for checklists and items
 */

import type { ChecklistEntity, ChecklistItemEntity } from './checklistTypes';

// In-memory storage
const checklists: Map<string, ChecklistEntity> = new Map();
const checklistItems: Map<string, ChecklistItemEntity[]> = new Map();

/**
 * @summary Get checklists map
 */
export function getChecklists(): Map<string, ChecklistEntity> {
  return checklists;
}

/**
 * @summary Get checklist items map
 */
export function getChecklistItems(): Map<string, ChecklistItemEntity[]> {
  return checklistItems;
}

/**
 * @summary Update checklist item in memory
 */
export function updateChecklistItemInMemory(
  checklistId: string,
  itemIndex: number,
  updatedItem: ChecklistItemEntity
): void {
  const items = checklistItems.get(checklistId);
  if (items && items[itemIndex]) {
    items[itemIndex] = updatedItem;
    checklistItems.set(checklistId, items);
  }
}
