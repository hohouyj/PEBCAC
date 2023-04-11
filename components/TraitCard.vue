<template>
	<v-card>
		<v-card-item>
			<v-card-title>
				{{ trait.name }}
				<div v-for="tag in trait.tags" class="w-min float-right">
					<Counter v-if="isCounter(tag)" :counterType="tag.split(' ')[0]" :maxcounter="Number(tag.split(' ')[1])" />
				</div>
			</v-card-title>
			<v-card-subtitle>
				{{ trait.optionType }}
			</v-card-subtitle>
			<v-chip v-for="tag in trait.tags" size="small">{{ tag }}</v-chip>
		</v-card-item>
		<v-card-text>
			{{ trait.desc }}
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
import { Option } from '~~/models/option.model';
const props = defineProps({
	trait: { type: Object as PropType<Option>, required: true },
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