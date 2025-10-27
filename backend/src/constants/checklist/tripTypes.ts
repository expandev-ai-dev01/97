/**
 * @module constants/checklist/tripTypes
 * @description Trip type constants for checklist categorization
 */

export enum TripType {
  Praia = 'Praia',
  Negocios = 'Negócios',
  Internacional = 'Internacional',
  Camping = 'Camping',
  Cruzeiro = 'Cruzeiro',
  Cidade = 'Cidade',
  Outro = 'Outro',
}

export const TRIP_TYPES = Object.values(TripType);

export const TRIP_TYPE_LABELS: Record<TripType, string> = {
  [TripType.Praia]: 'Praia',
  [TripType.Negocios]: 'Negócios',
  [TripType.Internacional]: 'Internacional',
  [TripType.Camping]: 'Camping',
  [TripType.Cruzeiro]: 'Cruzeiro',
  [TripType.Cidade]: 'Cidade',
  [TripType.Outro]: 'Outro',
};
