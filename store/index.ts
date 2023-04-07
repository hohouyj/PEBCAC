import { defineStore } from "pinia"
import { BattleGroup } from "~~/models/battleGroup.model"
import { v4 as uuidv4 } from "uuid"
import { Ship, ShipClass } from "~~/models/ship.model"
import { OptionMount } from "~~/models/optionMount.model"

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
	getters: {
		getBattleGroups: (state) => state.battlegroups,
		getShips: (state) => state.ships,
		getBattleGroupById: (state) => {
			return (bgId: string) => {
				let bg = state.battlegroups.find((bg)=>bg.id === bgId)
				return bg?bg:{
					id: "",
					name: "ID NOT FOUND",
					shipIds: [],
					points: 0
				}
			}
		},
		getShipById: (state) => {
			return (shipId: string): Ship => {
				let ship = state.ships.find((ship)=>ship.id === shipId)
				return ship?ship:{
					id: '',
					name: "SHIP ID NOT FOUND",
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
					isFlagShip: false,
					battleGroupIds: []
				}
			}
		},
		getShipPointsById: (state) => {
			return (shipId: string) => {
				const ship = state.ships.find((ship)=>ship.id === shipId)
				if(ship === undefined){
					return 0
				}
				if(ship.name.length == 0 || ship.id.length == 0){
					return 0
				}
				let sumMountPoints: number = 0
				ship.shipClass.mounts.forEach(mount => {sumMountPoints+=mount.points})
				return ship.shipClass.points+sumMountPoints
			}
		}
	},
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
				isFlagShip: false,
				battleGroupIds: []
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
		renameBattleGroup(battleGroupId: string | string[], newName: string) {
			if (newName.length > 0) {
				this.battlegroups[this.getBattleGroupIdxById(battleGroupId)].name = newName
			}
		},
		addNewShipToBattleGroup(battleGroupId: string) {
			const newShipId = uuidv4()
			console.log(battleGroupId)
			console.log(newShipId)
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
				isFlagShip: false,
				battleGroupIds: [battleGroupId]
			})
			console.log(this.ships[this.getShipIdxById(newShipId)])
			this.battlegroups[this.getBattleGroupIdxById(battleGroupId)].shipIds.push(newShipId)
		},
		getShipIdxById(id: string) {
			return this.ships.findIndex(
				(ship) => ship.id === id
			);
		},
		deleteShip(shipId: string) {
			console.log(shipId)

			const bgIds = this.ships[this.getShipIdxById(shipId)].battleGroupIds
			console.log(bgIds)
			for (const bgId of bgIds) {
				if (this.getBattleGroupIdxById(bgId) != -1) {
					console.log(bgId)
					const idx: number = this.battlegroups[this.getBattleGroupIdxById(bgId)].shipIds.indexOf(shipId)
					console.log(idx)
					if(idx != -1){
						this.battlegroups[this.getBattleGroupIdxById(bgId)].shipIds.splice(idx, 1)
					}
				}
			}
			if (this.getShipIdxById(shipId) != -1) {
				this.ships.splice(this.getShipIdxById(shipId), 1)
			}
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
		replaceOption(shipId: string, mountIdx: number, optionName: string, optionPoints: number) {
			this.ships[this.getShipIdxById(shipId)].shipClass.mounts[this.getMountIdx(shipId, mountIdx)].points = optionPoints
			this.ships[this.getShipIdxById(shipId)].shipClass.mounts[this.getMountIdx(shipId, mountIdx)].optionName = optionName
		}

	}
})