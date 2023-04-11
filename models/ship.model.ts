import { Option } from "./option.model";
import { OptionMount } from "./optionMount.model";

export interface Ship {
  id: string,
  name: string,
  totalPoints: number,
  shipClass: ShipClass,
	isFlagShip: boolean,
	flagShipMount: OptionMount[],
  legacies?: string[],
	battleGroupIds: string[]
}

export interface ShipClass {
  points: number,
  shipPrefix: string,
  class: string,
  type: string,
  hp:number,
  defense:number,
  traits: Option[],
  mounts: OptionMount[]
}