/**
 * @module services/checklistItemStatus/checklistItemStatusLogic
 * @description Business logic for checklist item status operations (in-memory storage)
 */

import { ItemStatus } from '@/constants/checklist';
import type { ChecklistItemStatusToggleResult } from './checklistItemStatusTypes';

// Import in-memory storage from checklist service
import { getChecklistItems, updateChecklistItemInMemory } from '../checklist/checklistMemoryStore';

/**
 * @summary
 * Toggles the verification status of a checklist item
 *
 * @function checklistItemStatusToggle
 * @module checklistItemStatus
 *
 * @param {string} itemId - Item identifier
 *
 * @returns {Promise<ChecklistItemStatusToggleResult>} Updated item with new status
 *
 * @throws {Error} When item not found
 */
export async function checklistItemStatusToggle(
  itemId: string
): Promise<ChecklistItemStatusToggleResult> {
  // Find item across all checklists
  for (const [checklistId, items] of getChecklistItems().entries()) {
    const itemIndex = items.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      const item = items[itemIndex];

      // Toggle status
      const newStatus =
        item.status === ItemStatus.Pendente ? ItemStatus.Verificado : ItemStatus.Pendente;

      // Update item
      const updatedItem = {
        ...item,
        status: newStatus,
        data_atualizacao: new Date(),
      };

      // Update in memory
      updateChecklistItemInMemory(checklistId, itemIndex, updatedItem);

      return {
        id: updatedItem.id,
        checklist_id: updatedItem.checklist_id,
        nome_item: updatedItem.nome_item,
        observacao: updatedItem.observacao,
        ordem: updatedItem.ordem,
        status: updatedItem.status,
        data_atualizacao: updatedItem.data_atualizacao,
      };
    }
  }

  throw new Error('Item não encontrado');
}
