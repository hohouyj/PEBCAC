<template>
	<v-card>
		<v-card-item>
			<v-card-title>
				<span v-if="!isNested" class="text-m">{{ option.points }}<v-icon icon="mdi-atom" size="x-small" class="pb-1"></v-icon></span>
				{{ option.name }} {{ option.damage }}
				<v-btn v-if="!isNested" icon="mdi-swap-horizontal" size="small" variant="text" @click.prevent="emit('selectOption')"
					class="float-right"></v-btn>
				<div v-for="tag in option.tags" class="w-min float-right">
					<Counter v-if="isCounter(tag)" :counterType="tag.split(' ')[0]" :maxcounter="Number(tag.split(' ')[1])" />
				</div>
			</v-card-title>
			<v-card-subtitle>
				{{ option.optionType }}
			</v-card-subtitle>
			<HitPoints v-if="option.hp" :maxHp="option.hp" />
			<v-chip v-for="tag in getTags" size="small">{{ tag }}</v-chip>
		</v-card-item>
		<v-card-text>
			{{ option.desc }}
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
import { Option } from '~~/models/option.model';
const props = defineProps({
	option: { type: Object as PropType<Option>, required: true },
	isNested: {default: false, type: Boolean}
})

const emit = defineEmits<{
	(e: 'selectOption'): void
}>()

const getTags = computed(()=>{
	let reTags = props.option.tags.slice()
	if(props.option.tenacity){
		reTags.push("Tenacity "+ props.option.tenacity.toString())
	}
	return reTags
})

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