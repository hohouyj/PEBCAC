<template>
	<div class="grow-0 w-fit h-min py-4 px-10">
		<v-row>
			<div class="flex">
			OS: {{ hp }}
			</div>
			<v-text-field v-if="isEditing" v-model="hp" ref="editHp" @blur="saveHp"  @keyup.enter="saveHp" variant="outlined" class="hpInput" density="compact" autofocus/>
			<v-icon v-else
			icon="mdi-pencil"
			size="small"
			@click.stop.prevent="showHpInput"
			>

			</v-icon>
		</v-row>
		<v-row>
		<v-rating v-model="hp" hover clearable :length="hp" density="compact" class="d-inline" empty-icon="mdi-hexagon-outline" full-icon="mdi-hexagon-slice-6"
			background-color="panel"/>
		</v-row>
	</div>
	

</template>

<script setup lang="ts">

const props = defineProps({
	maxHp: {type: Number, required: true},
}
)
const hp = ref<number>(props.maxHp)

const isEditing = ref(false)

async function showHpInput() {
	isEditing.value = true
}

function saveHp(){
	isEditing.value = false
}

</script>

<style lang="scss">
.v-rating .v-btn--icon.v-btn--density-compact {
  width: calc(var(--v-btn-height) + -17px);
  height: calc(var(--v-btn-height) + -8px);
}
.v-text-field.hpInput {
	width: 3.2rem;
	height: 2rem;
}
.v-text-field.hpInput .v-input__control {
	width: 3.2rem;
	height: 2rem;
}
.v-text-field.hpInput .v-input__details {
	width: 3.2rem;
	height: 2rem;
}

</style>