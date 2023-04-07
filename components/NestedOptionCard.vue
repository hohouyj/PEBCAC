<template>
<v-container>
<v-card v-if="option.name.length > 0">
	<v-card-item>
		
		<v-card-title>
			 {{ option.name }}
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
</v-container>
</template>

<script setup lang="ts">
import { Option } from '~~/models/option.model';

const props = defineProps({
	option: { type: Object as PropType<Option>, required: true },
})
</script>