import { defineStore } from "pinia"
import { BattleGroup } from "~~/models/battleGroup.model"
import { v4 as uuidv4 } from "uuid"
import { Ship, ShipClass } from "~~/models/ship.model"

export type RootState = {
	battlegroups: BattleGroup[],
	ships: Ship[]
}

export const useBattleGroupStore = defineStore({
	persist: {
		storage: persistedState.localStorage
	},
	id: "battleGroupStore",

	state: () => ({
		battlegroups: [],
		ships: []
	} as RootState),
	actions: {
		getBlankShip(): Ship {
			return {
				id: "",
				name: "New Ship",
				totalPoints: 0,
				shipClass: {
					points: 0,
					shipPrefix: "",
					class: "",
					type: "",
					hp: 0,
					defense: 0,
					traits: [],
					mounts: []
				},
				isFlagShip: false
			}
		},
		getBattleGroupIdxById(id: string | string[]): number {
			return this.battlegroups.findIndex(
				(battleGroup) => battleGroup.id === id
			);
		},
		addNewBattleGroup() {
			const newBattleGroup: BattleGroup = {
				id: uuidv4(),
				name: "New Battle Group",
				shipIds: [],
				points: 0
			};
			this.battlegroups.push(newBattleGroup);
		},
		deleteBattleGroup(battleGroupId: string) {
			this.battlegroups.splice(this.getBattleGroupIdxById(battleGroupId), 1)
		},
		getBattleGroup(battleGroupId: string | string[]): BattleGroup {
			return this.battlegroups[this.getBattleGroupIdxById(battleGroupId)]
		},
		renameBattleGroup(battleGroupId: string | string[], newName: string) {
			if (newName.length > 0) {
				this.battlegroups[this.getBattleGroupIdxById(battleGroupId)].name = newName
			}
		},
		addNewShipToBattleGroup(battleGroupId: string | string[]) {
			const newShipId = uuidv4()
			this.ships.push({
				id: newShipId,
				name: "New Ship",
				totalPoints: 0,
				shipClass: {
					points: 0,
					shipPrefix: "",
					class: "",
					type: "",
					hp: 0,
					defense: 0,
					traits: [],
					mounts: []
				},
				isFlagShip: false
			})
			this.battlegroups[this.getBattleGroupIdxById(battleGroupId)].shipIds.push(newShipId)
		},
		getShipIdxById(id: string) {
			return this.ships.findIndex(
				(ship) => ship.id === id
			);
		},
		deleteShip(shipId: string) {
			this.ships.splice(this.getBattleGroupIdxById(shipId), 1)
		},
		getShip(shipId: string): Ship {
			return this.ships[this.getShipIdxById(shipId)]
		},
		replaceShipClass(shipId: string, shipClass: ShipClass) {
			const shipClassCopy = JSON.parse(JSON.stringify(shipClass))
			this.ships[this.getShipIdxById(shipId)].shipClass = shipClassCopy
		},
		renameShip(shipId: string, newName: string) {
			if (newName.length > 0) {
				this.ships[this.getShipIdxById(shipId)].name = newName
			}
		},
		getMountIdx(shipId: string, mountIdx: number) {
			return this.ships[this.getShipIdxById(shipId)].shipClass.mounts.findIndex((mount) => mount.idx === mountIdx)
		},
		replaceOption(shipId: string, mountIdx: number, optionName: string) {
			this.ships[this.getShipIdxById(shipId)].shipClass.mounts[this.getMountIdx(shipId, mountIdx)].optionName = optionName
		}

	}
})