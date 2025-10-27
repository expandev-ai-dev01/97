/**
 * @module checklist/components/ChecklistItemList/types
 * @summary Type definitions for ChecklistItemList component
 */

import type { ChecklistItem } from '../../types';

export interface ChecklistItemListProps {
  items: ChecklistItem[];
  onEdit: (item: ChecklistItem) => void;
  onDelete: (id: string) => void;
  showFilters?: boolean;
}
