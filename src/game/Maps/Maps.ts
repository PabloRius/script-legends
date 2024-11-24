import { mapData } from '../../types/mapData';
import { Pallet_town_map } from './Pallet_Town/Pallet_Town';
import { PJ_House } from './Pallet_Town/PJ_House';

export const maps: { [key: string]: mapData } = {
  Pallet_Town: Pallet_town_map,
  Pallet_Town_PJ_House: PJ_House,
};
