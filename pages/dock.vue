<template>
	<v-card>
		<v-card-item>
			<v-card-title>
				Dock
			</v-card-title>
		</v-card-item>
		<div v-if="getShips.length > 0">
			<ShipCard v-for="shipId in getShips" :shipId="shipId.id" class="mx-5 mb-3" />
		</div>

		<v-btn>Add Ship</v-btn>
	</v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Ship } from '~~/models/ship.model';
import { useBattleGroupStore } from '~~/store';

const battleGroupStore = useBattleGroupStore()

const {getShips} = storeToRefs(battleGroupStore)

</script>

<style scoped></style>