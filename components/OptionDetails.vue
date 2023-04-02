<template>
	<v-expansion-panel :title="option.name">
		<v-expansion-panel-text>
			<v-card>
				<v-card-item>
					<v-card-title>
						Points: {{ option.points }}
					</v-card-title>
					<template v-slot:append>
						<v-btn icon="mdi-check" size="small" variant="text" @click.prevent="changeOption(option.name)"></v-btn>
					</template>
					<v-chip close v-for="tag in option.tags">{{ tag }}</v-chip>
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
	option: {type: Object as PropType<Option>, required: true}
})

const emit = defineEmits<{
  (e: 'changeOption', optionName: string): void
}>()

function changeOption(optionName: string){
	emit('changeOption', optionName)
}
</script>

<style scoped>

</style>