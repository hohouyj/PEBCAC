<template>
	<v-card>
		<v-card-item>
			<v-card-title>
				{{ trait.name }}
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

</script>

<style scoped></style>