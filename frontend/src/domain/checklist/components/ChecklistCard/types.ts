/**
 * @module checklist/components/ChecklistCard/types
 * @summary Type definitions for ChecklistCard component
 */

import type { Checklist } from '../../types';

export interface ChecklistCardProps {
  checklist: Checklist;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}
