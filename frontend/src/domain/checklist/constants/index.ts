/**
 * @module checklist/constants
 * @summary Constants for checklist domain
 * @domain checklist
 * @category constants
 */

import type { TripType } from '../types';

export const TRIP_TYPES: TripType[] = [
  'Praia',
  'Negócios',
  'Internacional',
  'Camping',
  'Cruzeiro',
  'Cidade',
  'Outro',
];

export const TRIP_TYPE_LABELS: Record<TripType, string> = {
  Praia: 'Praia',
  Negócios: 'Negócios',
  Internacional: 'Internacional',
  Camping: 'Camping',
  Cruzeiro: 'Cruzeiro',
  Cidade: 'Cidade',
  Outro: 'Outro',
};

export const SORT_OPTIONS = [
  { value: 'Mais recentes', label: 'Mais recentes' },
  { value: 'Mais antigos', label: 'Mais antigos' },
  { value: 'Alfabética (A-Z)', label: 'Alfabética (A-Z)' },
  { value: 'Alfabética (Z-A)', label: 'Alfabética (Z-A)' },
] as const;

export const STATUS_FILTER_OPTIONS = [
  { value: 'Todos', label: 'Todos' },
  { value: 'Pendentes', label: 'Pendentes' },
  { value: 'Verificados', label: 'Verificados' },
] as const;

export const MAX_ITEMS_PER_CHECKLIST = 50;
