/**
 * @module checklist
 * @summary Checklist management domain module
 * @domain functional
 * @version 1.0.0
 */

export * from './types';
export * from './constants';
export * from './services/checklistService';
export * from './services/checklistItemStatusService';
export * from './hooks/useChecklistList';
export * from './hooks/useChecklistDetail';
export * from './hooks/useChecklistItemStatus';
export * from './components/ChecklistCard';
export * from './components/ChecklistForm';
export * from './components/ChecklistItemForm';
export * from './components/ChecklistItemList';

export const moduleMetadata = {
  name: 'checklist',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['ChecklistCard', 'ChecklistForm', 'ChecklistItemForm', 'ChecklistItemList'],
  publicHooks: ['useChecklistList', 'useChecklistDetail', 'useChecklistItemStatus'],
  publicServices: ['checklistService', 'checklistItemStatusService'],
  dependencies: {
    internal: ['@/core/lib/api', '@/core/components'],
    external: ['react', 'react-hook-form', 'zod', '@tanstack/react-query', 'date-fns'],
    domains: [],
  },
  exports: {
    components: ['ChecklistCard', 'ChecklistForm', 'ChecklistItemForm', 'ChecklistItemList'],
    hooks: ['useChecklistList', 'useChecklistDetail', 'useChecklistItemStatus'],
    services: ['checklistService', 'checklistItemStatusService'],
    types: ['Checklist', 'ChecklistItem', 'TripType', 'ItemStatus'],
    constants: ['TRIP_TYPES', 'TRIP_TYPE_LABELS', 'SORT_OPTIONS'],
  },
} as const;
