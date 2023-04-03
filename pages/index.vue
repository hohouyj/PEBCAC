<template>
	<div>
		<v-btn>
			BATTLEGROUPS
		</v-btn>

		<HitPoints :maxHp="30" hpType="OS" />
		<v-btn density="compact">
			COMPENDIUM
		</v-btn>
		<v-btn icon="mdi-swap-horizontal" size="small" variant="text" class="float-right" density="compact"></v-btn>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>