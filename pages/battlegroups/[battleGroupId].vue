<template>
	<v-card>
		<v-card-item>
			<v-text-field :placeholder="battleGroup.name" v-if="isRenameing" v-model="newName" @blur="renameBattleGroup"
				@keyup.enter="renameBattleGroup"></v-text-field>

			<v-card-title v-else @click="() => isRenameing = true">
				{{ battleGroup.name }}
			</v-card-title>
		</v-card-item>
		<div v-if="battleGroup.shipIds.length > 0">
			<ShipCard v-for="shipId in battleGroup.shipIds" :shipId="shipId" class="mx-5 mb-3" />
		</div>

		<v-btn @click="addNewShipToBattleGroup">Add Ship</v-btn>
	</v-card>
</template>

<script setup lang="ts">
import { BattleGroup } from '~~/models/battleGroup.model';
import { useBattleGroupStore } from '~~/store';

const { battleGroupId } = useRoute().params

const battleGroupStore = useBattleGroupStore()

const battleGroup = ref<BattleGroup>({
	id: '',
	name: '',
	shipIds: [],
	points: 0
});

onMounted(() => {
	battleGroup.value = battleGroupStore.getBattleGroup(battleGroupId)
});

const isRenameing = ref(false)

const newName = ref('')

function addNewShipToBattleGroup() {
	battleGroupStore.addNewShipToBattleGroup(battleGroupId)
}

function renameBattleGroup() {
	battleGroupStore.renameBattleGroup(battleGroupId, newName.value)
	isRenameing.value = false
}

</script>

<style scoped></style>