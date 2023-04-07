<template>
	<div class="mr-20">
		<span>
			{{ counterType + ' ' }}
		</span>
		<v-rating v-model="counter" hover clearable :length="maxcounter" density="compact" class="d-inline"
			:empty-icon="icons.emptyIcon" :full-icon="icons.fullIcon" background-color="panel" />
	</div>
</template>

<script setup lang="ts">

const props = defineProps({
	maxcounter: { type: Number, required: true },
	counterType: { type: String, required: true }
}
)
const counter = ref<number>(props.maxcounter)

const icons = computed(() => {
	if (props.counterType.toLowerCase() == 'charge') {
		return {
			emptyIcon: "mdi-decagram-outline",
			fullIcon: "mdi-decagram"
		}
	} else if (props.counterType.toLowerCase() == 'limited') {
		return {
			emptyIcon: "mdi-hexagon-outline",
			fullIcon: "mdi-hexagon-slice-6"
		}
	} else if (props.counterType.toLowerCase() == 'reloading') {
		counter.value = 0
		return {
			emptyIcon: "mdi-circle-outline",
			fullIcon: "mdi-cached"
		}
	}
	return {
			emptyIcon: "mdi-hexagon-outline",
			fullIcon: "mdi-hexagon-slice-6"
		}
})
onMounted(() => {

})

</script>

<style lang="scss">
.v-rating .v-btn--icon.v-btn--density-compact {
	width: calc(var(--v-btn-height) + -17px);
	height: calc(var(--v-btn-height) + -8px);
}

.v-text-field.counterInput {
	width: 3.2rem;
	height: 2rem;
}

.v-text-field.counterInput .v-input__control {
	width: 3.2rem;
	height: 2rem;
}

.v-text-field.counterInput .v-input__details {
	width: 3.2rem;
	height: 2rem;
}</style>