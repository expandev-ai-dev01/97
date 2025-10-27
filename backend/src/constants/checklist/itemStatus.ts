/**
 * @module constants/checklist/itemStatus
 * @description Item status constants for checklist items
 */

export enum ItemStatus {
  Pendente = 'pendente',
  Verificado = 'verificado',
}

export const ITEM_STATUSES = Object.values(ItemStatus);

export const ITEM_STATUS_LABELS: Record<ItemStatus, string> = {
  [ItemStatus.Pendente]: 'Pendente',
  [ItemStatus.Verificado]: 'Verificado',
};
