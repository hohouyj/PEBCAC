import { Option } from "./option.model";
import { OptionMount } from "./optionMount.model";

export interface Ship {
  id: string,
  name: string,
  totalPoints: number,
  shipClass: ShipClass,
  legacies?: Option[]
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