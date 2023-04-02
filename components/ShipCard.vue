<template>
	<div draggable="true">
		<v-card>
			<v-card-item>
				<v-text-field :placeholder="ship.name" v-if="isRenameing" v-model="newName" @blur="renameShip"
					@keyup.enter="renameShip"></v-text-field>
				<v-card-title v-else @click="() => isRenameing = true">
					{{ ship.name }}
				</v-card-title>
			</v-card-item>

			<v-expansion-panels :model-value="isSelecting ? [0] : null" v-if="ship.shipClass.class.length == 0">
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

			<v-card v-if="ship.shipClass.class.length > 0">
				<v-card-item>
					<v-card-title>
						{{ ship.shipClass.class }}
					</v-card-title>
					<template v-slot:append>
						<v-btn icon="mdi-swap-horizontal" size="small" variant="text" @click.prevent="selectShipClass"></v-btn>
					</template>
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

				<TraitCard class="mx-5 mb-3" :trait="trait" v-for="trait in ship.shipClass.traits" />
				<MountCard class="mx-8 mb-3" :mount="mount" :optionName="mount.optionName"
					v-for="(mount, mountIdx) in ship.shipClass.mounts" @changeOption="replaceOption" />
			</v-card>
		</v-card>
	</div>
</template>

<script setup lang="ts">
import { Ship, ShipClass } from '~~/models/ship.model';
import { useBattleGroupStore } from '~~/store';
import shipClasses from '../data/ships.json'

const props = defineProps({
	shipId: { type: String, required: true }
})

const battleGroupStore = useBattleGroupStore()

const ship = ref<Ship>(battleGroupStore.getBlankShip())

const isSelecting = ref(false)

const isRenameing = ref(false)

const newName = ref('')

onMounted(() => {
	ship.value = battleGroupStore.getShip(props.shipId)
});

function replaceShipClass(shipClass: ShipClass) {
	battleGroupStore.replaceShipClass(props.shipId, shipClass)
	isSelecting.value = false
}

function selectShipClass() {
	isSelecting.value = !isSelecting.value
}

function replaceOption(mountIdx: number, optionName: string) {
	battleGroupStore.replaceOption(props.shipId, mountIdx, optionName)
}

function renameShip() {
	battleGroupStore.renameShip(props.shipId, newName.value)
	isRenameing.value = false
}

</script>

<style scoped></style>