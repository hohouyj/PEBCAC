<template>
	<div draggable="true" class="max-w-2xl min-w-2xl">
		<v-card>
			<v-card-item>
				<v-text-field ref="renameInput" :placeholder="getShipById(shipId).name" v-if="isRenameing" v-model="newName"
					@blur="renameShip" @keyup.enter="renameShip" variant="underlined" autofocus></v-text-field>
				<v-card-title v-else @click.stop.prevent="showRenameInput">
					{{ getShipById(shipId).name }}
					<v-icon v-if="getShipById(shipId).isFlagShip" icon="mdi-flag"></v-icon>
					<v-btn icon="mdi-delete" size="small" variant="text" @click.stop.prevent="deleteShip"
						class="float-right"></v-btn>
				</v-card-title>
				<v-container v-if="getShipById(shipId).shipClass.class.length > 0" class="flex justify-start flex-wrap">
						<div class="grow-0 w-16 h-min p-4">
							<v-row>
								Points
							</v-row>
							<v-row>
								{{ getShipPointsById(shipId) }} <v-icon icon="mdi-atom"></v-icon>
							</v-row>
						</div>
						<div class="grow-0 w-16 h-min p-4">
							<v-row>
								Defense
							</v-row>
							<v-row>
								{{ getShipById(shipId).shipClass.defense }} <v-icon icon="mdi-shield"></v-icon>
							</v-row>
						</div>
						<OverShield :maxHp="overShield" class="d-inline" />
						<HitPoints :maxHp="getHp" class="d-inline" />
					</v-container>
			</v-card-item>

			<v-expansion-panels :model-value="isSelecting ? [0] : null" v-if="getShipById(shipId).shipClass.class.length == 0">
				<v-expansion-panel>
					<v-expansion-panel-title>
						SELECT SHIP CLASS
					</v-expansion-panel-title>
					<v-expansion-panel-text>
						<v-expansion-panels>
							<ShipClassDetails :shipClass="shipClass" v-for="shipClass in shipClasses.ships"
								@changeShipClass="replaceShipClass(shipClass)" />
						</v-expansion-panels>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>

			<v-card v-if="getShipById(shipId).shipClass.class.length > 0">
				<v-card-item>
					<v-card-title>
						{{ getShipById(shipId).shipClass.shipPrefix }} {{ getShipById(shipId).shipClass.class }} {{
							getShipById(shipId).shipClass.type }}
						<v-btn icon="mdi-swap-horizontal" size="small" variant="text" @click.prevent="selectShipClass"
							class="float-right"></v-btn>
					</v-card-title>
				</v-card-item>
				<v-expansion-panels :model-value="isSelecting ? [0] : null" v-if="isSelecting">
					<v-expansion-panel>
						<v-expansion-panel-title>
							SELECT SHIP CLASS
						</v-expansion-panel-title>
						<v-expansion-panel-text>
							<v-expansion-panels>
								<ShipClassDetails :shipClass="shipClass" v-for="shipClass in shipClasses.ships"
									@changeShipClass="replaceShipClass(shipClass)" />
							</v-expansion-panels>
						</v-expansion-panel-text>
					</v-expansion-panel>
				</v-expansion-panels>

				<TraitCard class="mx-5 mb-3" :trait="trait" v-for="trait in getShipById(shipId).shipClass.traits" />
				<MountCard class="mx-8 mb-3" :mount="mount" :optionName="mount.optionName"
					v-for="(mount, mountIdx) in getShipById(shipId).shipClass.mounts" @changeOption="replaceOption" />
				<MountCard class="mx-8 mb-3" :mount="getShipById(shipId).flagShipMount[0]" :optionName="getShipById(shipId).flagShipMount[0].optionName"
				v-if="getShipById(shipId).isFlagShip" @changeOption="replaceFlagShipOption" />
			</v-card>
		</v-card>
	</div>
</template>

<script setup lang="ts">
import { Ship, ShipClass } from '~~/models/ship.model';
import { useBattleGroupStore } from '~~/store';
import shipClasses from '../data/ships.json'
import { storeToRefs } from 'pinia';

const props = defineProps({
	shipId: { type: String, required: true }
})

const battleGroupStore = useBattleGroupStore()

const { getShipById, getShipPointsById } = storeToRefs(battleGroupStore)

const isSelecting = ref(false)

const isRenameing = ref(false)

const overShield = ref(0)

const newName = ref('')

function replaceShipClass(shipClass: ShipClass) {
	battleGroupStore.replaceShipClass(props.shipId, shipClass)
	isSelecting.value = false
}

function selectShipClass() {
	isSelecting.value = !isSelecting.value
}

function replaceOption(mountIdx: number, optionName: string, optionPoints: number) {
	battleGroupStore.replaceOption(props.shipId, mountIdx, optionName, optionPoints)
}

function replaceFlagShipOption(mountIdx: number, optionName: string, optionPoints: number){
	battleGroupStore.replaceFlagShipOption(props.shipId, optionName, optionPoints)
}

async function showRenameInput() {
	isRenameing.value = true
}

function renameShip() {
	battleGroupStore.renameShip(props.shipId, newName.value)
	isRenameing.value = false
	newName.value = ''
}

function deleteShip() {
	battleGroupStore.deleteShip(props.shipId)
}

const getHp = computed(()=>{
	const ship = battleGroupStore.getShipById(props.shipId)
	if(ship.isFlagShip){
		return ship.shipClass.hp+3
	}else{
		return ship.shipClass.hp
	}
})
</script>

<style scoped></style>