export interface mapTransition {
  entryX: number;
  entryY: number;
  destinationMap: string;
  destX: number;
  destY: number;
  direction: 'up' | 'down' | 'right' | 'left';
}
