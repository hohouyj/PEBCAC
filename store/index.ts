import { defineStore } from "pinia"
import { BattleGroup } from "~~/models/battleGroup.model"
import { v4 as uuidv4 } from "uuid"
import { Ship, ShipClass } from "~~/models/ship.model"
import { OptionMount } from "~~/models/optionMount.model"
import allOptions from "~/data/options.json"


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
				let bg = state.battlegroups.find((bg) => bg.id === bgId)
				return bg ? bg : {
					id: "",
					name: "ID NOT FOUND",
					shipIds: [],
					points: 0
				}
			}
		},
		getShipById: (state) => {
			return (shipId: string): Ship => {
				let ship = state.ships.find((ship) => ship.id === shipId)
				return ship ? ship : {
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
					flagShipMount: [],
					battleGroupIds: []
				}
			}
		},
		getShipPointsById: (state) => {
			//eiland + carriers one time discount 3 for wings and escorts escort + wing - 3 (min 0)
			// test farragut, amazon and greenland eiland
			//amazon has escort + wing - 4 (min 0)
			//crieton superheavy -1 pt (min 0)
			return (shipId: string) => {
				const ship = state.ships.find((ship) => ship.id === shipId)
				let wingDiscount = 0
				let superheavyDiscount = 0

				if (ship === undefined) {
					return 0
				}
				if (ship.name.length == 0 || ship.id.length == 0) {
					return 0
				}
				if (ship.shipClass.class.includes("CREIGHTON-CLASS")) {
					superheavyDiscount = 1
				}
				if (ship.shipClass.type.includes("CARRIER") && !(ship.shipClass.type === "BATTLECARRIER")) {
					wingDiscount = 3
				}
				if (ship.shipClass.class === "AMAZON-CLASS") {
					wingDiscount++
				}

				let sumMountPoints: number = 0
				let totalWingEscortPoints: number = 0
				let totalSuperheavyPoints = 0
				ship.shipClass.mounts.forEach(mount => {
					if (!(mount.optionName === '')) {
						const equippedOptionType = allOptions.options.filter(option => option.name === mount.optionName)[0].optionType

						if (mount.types.includes("Wing") || mount.types.includes("Escort")) {
							if (equippedOptionType === "Wing" || equippedOptionType === "Escort") {
								totalWingEscortPoints += mount.points
							}else{
								sumMountPoints += mount.points
							}

						}else if(mount.types.includes("Superheavy")){
							if (equippedOptionType === "Superheavy") {
								totalSuperheavyPoints += mount.points
							}else{
								sumMountPoints += mount.points
							}
						}
						else {
							sumMountPoints += mount.points
						}
					}
				})
				totalWingEscortPoints -= wingDiscount
				totalSuperheavyPoints -= superheavyDiscount

				return ship.shipClass.points + sumMountPoints + Math.max(totalWingEscortPoints,0) + Math.max(totalSuperheavyPoints,0)
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
				flagShipMount: [],
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
				flagShipMount: [],
				battleGroupIds: [battleGroupId]
			})
			console.log(this.ships[this.getShipIdxById(newShipId)])
			this.battlegroups[this.getBattleGroupIdxById(battleGroupId)].shipIds.push(newShipId)
		},
		addFlagShipToBattleGroup(battleGroupId: string) {
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
				isFlagShip: true,
				flagShipMount: [{
					idx: 0,
					points: 0,
					types: ["System"],
					optionName: '',
					tagWhiteList: [],
					tagBlackList: []
				}],
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
					if (idx != -1) {
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