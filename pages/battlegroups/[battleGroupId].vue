<template>
	<v-card>
		<v-card-item>
			<v-text-field ref="renameInput" :placeholder="getBattleGroupById(battleGroupId.toString()).name" v-if="isRenameing" v-model="newName" @blur="renameBattleGroup"
				@keyup.enter="renameBattleGroup" variant="underlined">
			</v-text-field>

			<v-card-title v-else @click="showRenameInput">
				{{ getBattleGroupById(battleGroupId.toString()).name }}
			</v-card-title>
		</v-card-item>
		<div v-if="getBattleGroupById(battleGroupId.toString()).shipIds.length > 0">
			<ShipCard v-for="shipId in getBattleGroupById(battleGroupId.toString()).shipIds" v-bind:key="shipId" :shipId="shipId" class="mx-5 mb-3" />
		</div>

		<v-btn @click="addNewShipToBattleGroup">Add Ship</v-btn>
	</v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBattleGroupStore } from '~~/store';

const { battleGroupId } = useRoute().params
const battleGroupStore = useBattleGroupStore()
const { getBattleGroupById } = storeToRefs(battleGroupStore)

const isRenameing = ref(false)

const newName = ref('')

function addNewShipToBattleGroup() {
	battleGroupStore.addNewShipToBattleGroup(battleGroupId.toString())
}

function renameBattleGroup() {
	battleGroupStore.renameBattleGroup(battleGroupId, newName.value)
	isRenameing.value = false
	newName.value = ''
}

const renameInput = ref<HTMLInputElement | null>(null)

async function showRenameInput() {
	isRenameing.value = true
	await nextTick()
	renameInput.value?.focus()
}

</script>

<style scoped></style>