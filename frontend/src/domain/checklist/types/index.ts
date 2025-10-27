/**
 * @module checklist/types
 * @summary Type definitions for checklist domain
 * @domain checklist
 * @category types
 */

export interface Checklist {
  id: string;
  nome_checklist: string;
  tipo_viagem: TripType;
  descricao?: string;
  data_criacao: string;
  data_atualizacao?: string;
  usuario_id: string;
  total_itens?: number;
  itens_verificados?: number;
  progresso?: number;
  itens?: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  checklist_id: string;
  nome_item: string;
  observacao?: string;
  ordem: number;
  status: ItemStatus;
  data_atualizacao?: string;
}

export type TripType =
  | 'Praia'
  | 'Negócios'
  | 'Internacional'
  | 'Camping'
  | 'Cruzeiro'
  | 'Cidade'
  | 'Outro';

export type ItemStatus = 'pendente' | 'verificado';

export interface CreateChecklistDto {
  nome_checklist: string;
  tipo_viagem: TripType;
  descricao?: string;
}

export interface UpdateChecklistDto {
  nome_checklist: string;
  tipo_viagem: TripType;
  descricao?: string;
}

export interface CreateChecklistItemDto {
  checklist_id: string;
  nome_item: string;
  observacao?: string;
}

export interface UpdateChecklistItemDto {
  nome_item: string;
  observacao?: string;
}

export interface ChecklistListParams {
  tipo_viagem?: TripType | 'Todos';
  ordenacao?: 'Mais recentes' | 'Mais antigos' | 'Alfabética (A-Z)' | 'Alfabética (Z-A)';
}

export interface ChecklistItemListParams {
  checklist_id: string;
  status?: ItemStatus | 'Todos';
  busca_texto?: string;
}
