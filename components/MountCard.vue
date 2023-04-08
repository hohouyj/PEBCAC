<template>
	<div>
		<v-card v-if="option.name.length > 0">
			<v-card-item>

				<v-card-title>
					<span class="text-m">{{ option.points }}<v-icon icon="mdi-atom" size="x-small" class="pb-1"></v-icon></span>
					{{ option.name }} {{ option.damage }}

					<v-btn icon="mdi-swap-horizontal" size="small" variant="text" @click.prevent="selectOption"
						class="float-right"></v-btn>
					<div v-for="tag in option.tags" class="w-min float-right">
						<Counter v-if="isCounter(tag)" :counterType="tag.split(' ')[0]" :maxcounter="Number(tag.split(' ')[1])" />
					</div>
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
		<NestedOptionCard v-for="o in option.options" :option="o" />
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

function checkTagsInList(tags: string[], list: string[]) {
	let containsTag = false;
	for (const optionTag of tags) {
		for(const listTag of list) {
			if(optionTag.toLowerCase().includes(listTag))
			containsTag = true;
			break;
		}
	}
	return containsTag
}

function getValidOptionsList() {
	if (props.mount.tagBlackList.length > 0) {
		return options.options.filter((o) => (props.mount.types.includes(o.optionType) && !checkTagsInList(o.tags, props.mount.tagBlackList)))
	} else if (props.mount.tagWhiteList.length > 0) {
		return options.options.filter((o) => (props.mount.types.includes(o.optionType) && checkTagsInList(o.tags, props.mount.tagWhiteList)))
	} else {
		return options.options.filter((o) => props.mount.types.includes(o.optionType))
	}
}

const emit = defineEmits<{
	(e: 'changeOption', mountIdx: number, optionName: string, optionPoints: number): void
}>()

function changeOption(optionName: string, optionPoints: number) {
	isSelecting.value = false
	emit('changeOption', props.mount.idx, optionName, optionPoints)
}

function selectOption() {
	isSelecting.value = !isSelecting.value
}

const option = computed(getOptionFromJson)
const validOptionsList = computed(getValidOptionsList)

function isCounter(tag: string) {
	switch (tag.split(" ")[0].toLowerCase()) {
		case "reloading":
			return true
		case "limited":
			return true
		case "charge":
			return true
		default:
			return false
	}
}
</script>

<style scoped></style>