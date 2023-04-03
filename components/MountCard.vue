<template>
	<div>
		<v-card v-if="option.name.length > 0">
			<v-card-item>
				<v-card-title>
					{{ option.name }}
					<v-btn icon="mdi-swap-horizontal" size="small" variant="text" @click.prevent="selectOption" class="float-right"></v-btn>
				</v-card-title>

				<v-card-subtitle>
					{{ option.optionType }}
				</v-card-subtitle>

				<v-chip v-for="tag in option.tags" size="small">{{ tag }}</v-chip>

			</v-card-item>

			<v-card-text>
				{{ option.desc }}
			</v-card-text>
		</v-card>

		<v-expansion-panels :model-value="isSelecting ? [0] : null" v-if="option.name.length == 0 || isSelecting">
			<v-expansion-panel>
				<v-expansion-panel-title>
					SELECT {{ mount.types[0].toUpperCase() }} OPTION
				</v-expansion-panel-title>
				<v-expansion-panel-text>
					<v-expansion-panels>
						<OptionDetails :option="option" v-for="option in validOptionsList" @changeOption="changeOption" />
					</v-expansion-panels>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script setup lang="ts">
import options from '../data/options.json'
import { Option } from '~~/models/option.model';
import { OptionMount } from "~~/models/optionMount.model"
const props = defineProps({
	optionName: { type: String, required: true },
	mount: { type: Object as PropType<OptionMount>, required: true }
})

const isSelecting = ref(false)

function getOptionFromJson() {
	let reOption: Option = options.options.filter((item) => item.name === props.optionName)[0]
	if (reOption) {
		return reOption
	}
	else return {
		name: "",
		points: 0,
		optionType: "",
		hp: null,
		tenacity: null,
		range: [],
		damage: null,
		reloading: null,
		charge: null,
		limited: null,
		unique: false,
		tags: [],
		desc: "",
		options: []
	}
}

function getValidOptionsList() {
	return options.options.filter((o) => props.mount.types.includes(o.optionType))
}

const emit = defineEmits<{
	(e: 'changeOption', mountIdx: number, optionName: string): void
}>()

function changeOption(optionName: string) {
	isSelecting.value = false
	emit('changeOption', props.mount.idx, optionName)
}

function selectOption() {
	isSelecting.value = !isSelecting.value
}

const option = computed(getOptionFromJson)
const validOptionsList = computed(getValidOptionsList)
</script>

<style scoped></style>