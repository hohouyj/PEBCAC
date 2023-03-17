import { Ship } from "./ship.model"
export interface BattleGroup {
  id: string,
  name: string,
  ships: Ship[],
  points: number
}