/**
 * @module services/checklist/checklistTypes
 * @description Type definitions for checklist service
 */

import { TripType } from '@/constants/checklist';
import { ItemStatus } from '@/constants/checklist';

/**
 * @interface ChecklistEntity
 * @description Represents a checklist entity in the system
 *
 * @property {string} id - Unique checklist identifier (UUID)
 * @property {string} nome_checklist - Checklist name
 * @property {TripType} tipo_viagem - Trip type category
 * @property {string | null} descricao - Optional description
 * @property {Date} data_criacao - Creation timestamp
 * @property {Date} data_atualizacao - Last update timestamp
 */
export interface ChecklistEntity {
  id: string;
  nome_checklist: string;
  tipo_viagem: TripType;
  descricao: string | null;
  data_criacao: Date;
  data_atualizacao: Date;
}

/**
 * @interface ChecklistItemEntity
 * @description Represents a checklist item entity
 *
 * @property {string} id - Unique item identifier (UUID)
 * @property {string} checklist_id - Parent checklist identifier
 * @property {string} nome_item - Item name
 * @property {string | null} observacao - Optional notes
 * @property {number} ordem - Display order
 * @property {ItemStatus} status - Item verification status
 * @property {Date} data_atualizacao - Last update timestamp
 */
export interface ChecklistItemEntity {
  id: string;
  checklist_id: string;
  nome_item: string;
  observacao: string | null;
  ordem: number;
  status: ItemStatus;
  data_atualizacao: Date;
}

/**
 * @interface ChecklistCreateRequest
 * @description Request parameters for creating a checklist
 */
export interface ChecklistCreateRequest {
  nome_checklist: string;
  tipo_viagem: TripType;
  descricao?: string | null;
}

/**
 * @interface ChecklistUpdateRequest
 * @description Request parameters for updating a checklist
 */
export interface ChecklistUpdateRequest {
  id: string;
  nome_checklist: string;
  tipo_viagem: TripType;
  descricao?: string | null;
}

/**
 * @interface ChecklistItemCreateRequest
 * @description Request parameters for creating a checklist item
 */
export interface ChecklistItemCreateRequest {
  checklist_id: string;
  nome_item: string;
  observacao?: string | null;
}

/**
 * @interface ChecklistItemUpdateRequest
 * @description Request parameters for updating a checklist item
 */
export interface ChecklistItemUpdateRequest {
  id: string;
  nome_item: string;
  observacao?: string | null;
}

/**
 * @interface ChecklistListResponse
 * @description Response format for checklist list
 */
export interface ChecklistListResponse {
  id: string;
  nome_checklist: string;
  tipo_viagem: TripType;
  descricao: string | null;
  data_criacao: Date;
  total_itens: number;
  itens_verificados: number;
}

/**
 * @interface ChecklistDetailResponse
 * @description Response format for checklist detail with items
 */
export interface ChecklistDetailResponse extends ChecklistEntity {
  itens: ChecklistItemEntity[];
  total_itens: number;
  itens_verificados: number;
  progresso: number;
}
