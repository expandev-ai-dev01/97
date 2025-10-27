/**
 * @module services/checklist/checklistLogic
 * @description Business logic for checklist operations (in-memory storage)
 */

import { v4 as uuidv4 } from 'uuid';
import {
  ChecklistEntity,
  ChecklistItemEntity,
  ChecklistCreateRequest,
  ChecklistUpdateRequest,
  ChecklistItemCreateRequest,
  ChecklistItemUpdateRequest,
  ChecklistListResponse,
  ChecklistDetailResponse,
} from './checklistTypes';
import { ItemStatus } from '@/constants/checklist';
import { getChecklists, getChecklistItems } from './checklistMemoryStore';

/**
 * @summary
 * Creates a new checklist
 *
 * @function checklistCreate
 * @module checklist
 *
 * @param {ChecklistCreateRequest} params - Checklist creation parameters
 *
 * @returns {Promise<ChecklistEntity>} Created checklist entity
 *
 * @throws {Error} When checklist name already exists
 */
export async function checklistCreate(params: ChecklistCreateRequest): Promise<ChecklistEntity> {
  const checklists = getChecklists();
  const checklistItems = getChecklistItems();

  // Check for duplicate name
  const existingChecklist = Array.from(checklists.values()).find(
    (c) => c.nome_checklist.toLowerCase() === params.nome_checklist.toLowerCase()
  );

  if (existingChecklist) {
    throw new Error('Você já possui um checklist com este nome');
  }

  const now = new Date();
  const checklist: ChecklistEntity = {
    id: uuidv4(),
    nome_checklist: params.nome_checklist,
    tipo_viagem: params.tipo_viagem,
    descricao: params.descricao || null,
    data_criacao: now,
    data_atualizacao: now,
  };

  checklists.set(checklist.id, checklist);
  checklistItems.set(checklist.id, []);

  return checklist;
}

/**
 * @summary
 * Lists all checklists with summary information
 *
 * @function checklistList
 * @module checklist
 *
 * @returns {Promise<ChecklistListResponse[]>} List of checklists with item counts
 */
export async function checklistList(): Promise<ChecklistListResponse[]> {
  const checklists = getChecklists();
  const checklistItems = getChecklistItems();
  const result: ChecklistListResponse[] = [];

  for (const [id, checklist] of checklists.entries()) {
    const items = checklistItems.get(id) || [];
    const itensVerificados = items.filter((item) => item.status === ItemStatus.Verificado).length;

    result.push({
      id: checklist.id,
      nome_checklist: checklist.nome_checklist,
      tipo_viagem: checklist.tipo_viagem,
      descricao: checklist.descricao,
      data_criacao: checklist.data_criacao,
      total_itens: items.length,
      itens_verificados: itensVerificados,
    });
  }

  return result.sort((a, b) => b.data_criacao.getTime() - a.data_criacao.getTime());
}

/**
 * @summary
 * Gets a checklist by ID with all items
 *
 * @function checklistGet
 * @module checklist
 *
 * @param {string} id - Checklist identifier
 *
 * @returns {Promise<ChecklistDetailResponse>} Checklist with items and progress
 *
 * @throws {Error} When checklist not found
 */
export async function checklistGet(id: string): Promise<ChecklistDetailResponse> {
  const checklists = getChecklists();
  const checklistItems = getChecklistItems();
  const checklist = checklists.get(id);

  if (!checklist) {
    throw new Error('Checklist não encontrado');
  }

  const items = checklistItems.get(id) || [];
  const itensVerificados = items.filter((item) => item.status === ItemStatus.Verificado).length;
  const progresso = items.length > 0 ? Math.round((itensVerificados / items.length) * 100) : 0;

  return {
    ...checklist,
    itens: items,
    total_itens: items.length,
    itens_verificados: itensVerificados,
    progresso,
  };
}

/**
 * @summary
 * Updates an existing checklist
 *
 * @function checklistUpdate
 * @module checklist
 *
 * @param {ChecklistUpdateRequest} params - Update parameters
 *
 * @returns {Promise<ChecklistEntity>} Updated checklist entity
 *
 * @throws {Error} When checklist not found or name already exists
 */
export async function checklistUpdate(params: ChecklistUpdateRequest): Promise<ChecklistEntity> {
  const checklists = getChecklists();
  const checklist = checklists.get(params.id);

  if (!checklist) {
    throw new Error('Checklist não encontrado');
  }

  // Check for duplicate name (excluding current checklist)
  const existingChecklist = Array.from(checklists.values()).find(
    (c) =>
      c.id !== params.id && c.nome_checklist.toLowerCase() === params.nome_checklist.toLowerCase()
  );

  if (existingChecklist) {
    throw new Error('Você já possui outro checklist com este nome');
  }

  const updated: ChecklistEntity = {
    ...checklist,
    nome_checklist: params.nome_checklist,
    tipo_viagem: params.tipo_viagem,
    descricao: params.descricao || null,
    data_atualizacao: new Date(),
  };

  checklists.set(params.id, updated);

  return updated;
}

/**
 * @summary
 * Deletes a checklist and all its items
 *
 * @function checklistDelete
 * @module checklist
 *
 * @param {string} id - Checklist identifier
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} When checklist not found
 */
export async function checklistDelete(id: string): Promise<void> {
  const checklists = getChecklists();
  const checklistItems = getChecklistItems();
  const checklist = checklists.get(id);

  if (!checklist) {
    throw new Error('Checklist não encontrado');
  }

  checklists.delete(id);
  checklistItems.delete(id);
}

/**
 * @summary
 * Adds an item to a checklist
 *
 * @function checklistItemCreate
 * @module checklist
 *
 * @param {ChecklistItemCreateRequest} params - Item creation parameters
 *
 * @returns {Promise<ChecklistItemEntity>} Created item entity
 *
 * @throws {Error} When checklist not found or item limit exceeded
 */
export async function checklistItemCreate(
  params: ChecklistItemCreateRequest
): Promise<ChecklistItemEntity> {
  const checklists = getChecklists();
  const checklistItems = getChecklistItems();
  const checklist = checklists.get(params.checklist_id);

  if (!checklist) {
    throw new Error('Checklist não encontrado');
  }

  const items = checklistItems.get(params.checklist_id) || [];

  if (items.length >= 50) {
    throw new Error('O checklist já atingiu o limite de 50 itens');
  }

  const item: ChecklistItemEntity = {
    id: uuidv4(),
    checklist_id: params.checklist_id,
    nome_item: params.nome_item,
    observacao: params.observacao || null,
    ordem: items.length + 1,
    status: ItemStatus.Pendente,
    data_atualizacao: new Date(),
  };

  items.push(item);
  checklistItems.set(params.checklist_id, items);

  return item;
}

/**
 * @summary
 * Updates a checklist item
 *
 * @function checklistItemUpdate
 * @module checklist
 *
 * @param {ChecklistItemUpdateRequest} params - Update parameters
 *
 * @returns {Promise<ChecklistItemEntity>} Updated item entity
 *
 * @throws {Error} When item not found
 */
export async function checklistItemUpdate(
  params: ChecklistItemUpdateRequest
): Promise<ChecklistItemEntity> {
  const checklistItems = getChecklistItems();

  for (const [checklistId, items] of checklistItems.entries()) {
    const itemIndex = items.findIndex((item) => item.id === params.id);

    if (itemIndex !== -1) {
      const updated: ChecklistItemEntity = {
        ...items[itemIndex],
        nome_item: params.nome_item,
        observacao: params.observacao || null,
        data_atualizacao: new Date(),
      };

      items[itemIndex] = updated;
      checklistItems.set(checklistId, items);

      return updated;
    }
  }

  throw new Error('Item não encontrado');
}

/**
 * @summary
 * Deletes a checklist item
 *
 * @function checklistItemDelete
 * @module checklist
 *
 * @param {string} id - Item identifier
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} When item not found
 */
export async function checklistItemDelete(id: string): Promise<void> {
  const checklistItems = getChecklistItems();

  for (const [checklistId, items] of checklistItems.entries()) {
    const itemIndex = items.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      items.splice(itemIndex, 1);

      // Reorder remaining items
      items.forEach((item, index) => {
        item.ordem = index + 1;
      });

      checklistItems.set(checklistId, items);
      return;
    }
  }

  throw new Error('Item não encontrado');
}
