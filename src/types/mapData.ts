import { mapTransition } from './mapTransition';

export interface mapData {
  height: number;
  layers: { data: number[] }[];
  width: number;
  tilesetName: string;
  mapTransitions: mapTransition[];
}
