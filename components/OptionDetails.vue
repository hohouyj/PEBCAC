<template>
	<v-expansion-panel :title="option.name">
		<v-expansion-panel-text>
			<v-card>
				<v-card-item>
					<v-card-title>
						<v-icon icon="mdi-atom"></v-icon> {{ option.points }}
						<HitPoints v-if="option.hp" :maxHp="option.hp" />
					</v-card-title>
					<template v-slot:append>
						<v-btn icon="mdi-check" size="small" variant="text" @click.prevent="changeOption(option.name)"></v-btn>
					</template>
					<v-chip close v-for="tag in getTags">{{ tag }}</v-chip>
				</v-card-item>
				<v-card-text>
					{{ option.desc }}
				</v-card-text>
			</v-card>
		</v-expansion-panel-text>
	</v-expansion-panel>
</template>

<script setup lang="ts">
import { Option } from '~~/models/option.model';
const props = defineProps({
	option: { type: Object as PropType<Option>, required: true }
})

const emit = defineEmits<{
	(e: 'changeOption', optionName: string, optionPoints: number): void
}>()

function changeOption(optionName: string) {
	emit('changeOption', optionName, props.option.points)
}


const getTags = computed(()=>{
	let reTags = props.option.tags.slice()
	if(props.option.tenacity){
		reTags.push("Tenacity "+props.option.tenacity.toString())
	}
	return reTags
})
</script>

<style scoped></style>