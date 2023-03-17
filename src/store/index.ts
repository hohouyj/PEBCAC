import { BattleGroup } from "@/models/battleGroup.model";
import { Ship, ShipClass } from "@/models/ship.model";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { Option } from "@/models/option.model";


export type MainStore = {
  battleGroups: BattleGroup[]
};


export const useMainStore = defineStore({
  persist: true,
  id: "mainStore",
  state: () =>
    ({
      battleGroups: []
    } as MainStore),
  
  actions: {
    getBattleGroupIdxById(id: string) {
      return this.battleGroups.findIndex(
        (battleGroup) => battleGroup.id === id
      );
    },
    getShipIdxById(bgId: string, shipId: string) {
      return this.battleGroups[this.getBattleGroupIdxById(bgId)].ships.findIndex(
        (ship) => ship.id === shipId
      );
    },
    getExampleShip() {
      const exampleShipClass: Ship = {
        id: uuidv4(),
        name: "RR TRASHBIN",
        totalPoints: 0,
        shipClass: {
          points: 2,
          shipPrefix: "FKS",
          class: "ONOPORDUM-CLASS:2 ELECTRIC BOOGALOO",
          type: "FRIGATE",
          hp: 14,
          defense: 10,
          traits: [
            {
              name: "STEALING LUCK FROM THE DEVIL",
              points: 0,
              optionType: "Trait",
              hp: null,
              tenacity: null,
              range: null,
              damage: null,
              reloading: null,
              charge: null,
              limited: null,
              unique: false,
              tags: [],
              options: [],
              desc: "1/engagement, you may add or subtract 1d3 from any d20 roll (yours, an ally's, or an enemy's) after seeing the result. Each roll can only be modified in this way once, even if you or your allies have more than one ship with this trait. Additionally, when this ship is assigned to a Defensive Screen, Interception is determined by a d20 roll - on a result of 10+, Interception succeeds.",
            },
          ],
          mounts: [
            {
              idx: 0,
              points: 0,
              types: ["Primary"],
              option: {optionType:''},
              tagWhiteList: [],
              tagBlackList: [],
            },{
              idx: 1,
              points: 0,
              types: ["Superheavy"],
              option: {optionType:''},
              tagWhiteList: [],
              tagBlackList: [],
            },{
              idx: 2,
              points: 0,
              types: ["Auxiliary"],
              option: {optionType:''},
              tagWhiteList: [],
              tagBlackList: [],
            },
          ],
        },
      };
      return exampleShipClass;
    },
    /**
     * app level
     *  Add BattleGroup
     */
    addNewBattleGroup() {
      const newBattleGroup: BattleGroup = {
        id: uuidv4(),
        name: "New Battle Group",
        ships: [],
        points: 0
      };
      this.battleGroups.push(newBattleGroup);
    },
    deleteBattleGroup(battleGroupId: string){
      this.battleGroups.splice(this.getBattleGroupIdxById(battleGroupId),1)
    },
    addNewShip(battleGroupId: string) {
      const newShip = this.getExampleShip()
      newShip.id = uuidv4()
      this.battleGroups[this.getBattleGroupIdxById(battleGroupId)].ships.push(newShip)
    },
    editBattleGroupName(battleGroupId: string, name: string) {
      this.battleGroups[this.getBattleGroupIdxById(battleGroupId)].name = name
    },
    editShipName(battleGroupId: string,shipId: string, name: string) {
      this.battleGroups[this.getBattleGroupIdxById(battleGroupId)].ships[this.getShipIdxById(battleGroupId,shipId)].name = name
    },
    selectShipClass(battleGroupId:string, shipId: string, shipClass: ShipClass){
      const shipClassCopy = JSON.parse(JSON.stringify(shipClass))
      this.battleGroups[this.getBattleGroupIdxById(battleGroupId)].ships[this.getShipIdxById(battleGroupId,shipId)].shipClass = shipClassCopy
    },
    selectOption(battleGroupId: string, shipId: string, mountIdx: number, option: Option) {
      const optionCopy = JSON.parse(JSON.stringify(option))
      console.log(this.getShipIdxById(battleGroupId, shipId))
      console.log(this.battleGroups[this.getBattleGroupIdxById(battleGroupId)].ships[this.getShipIdxById(battleGroupId, shipId)])
      this.battleGroups[this.getBattleGroupIdxById(battleGroupId)]
            .ships[this.getShipIdxById(battleGroupId, shipId)]
            .shipClass
            .mounts[mountIdx]
            .option = optionCopy
    }
  },
});
