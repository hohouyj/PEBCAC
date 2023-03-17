<template>
  <div class="--pebcac-option-mount" >
    <div v-if="mount.option">
      <OptionCard :option="mount.option" @changeOption="toggleSelection" :showEditIcon="true" style="margin: auto"/>
    </div>
    <div v-else @click="toggleSelection" style="font-size: 1.5rem; background-color: lightgrey;">
      NO SELECTION FOR {{ mount.types[0].toUpperCase() }} OPTION
    </div>
    <div v-if="state.selecting">
      <OptionSelector :valid-options-list="validOptionsList" @equipOption="equipOption" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { OptionMount } from '@/models/optionMount.model';
import { computed, defineProps, PropType, reactive } from 'vue';
import { useMainStore } from '@/store';
import { Option } from '@/models/option.model';
import OptionCard from './optionCard.vue';
import optionsJson from '../data/options.json'
import OptionSelector from './optionSelector.vue';


const props = defineProps({
  mount: { type: Object as PropType<OptionMount>, required: true },
  shipId: { type: String, required: true },
  battleGroupId: { type: String, required: true }
})

const mainStore = useMainStore()

const validOptionsList = computed(() => {
  return optionsJson.options.filter((option) => props.mount.types.includes(option.optionType))
})

const state = reactive({
  selecting: false,
})
function toggleSelection(): void {
  state.selecting = !state.selecting
}
function equipOption(option: Option) {
  mainStore.selectOption(props.battleGroupId, props.shipId, props.mount.idx, option)
  toggleSelection()
}

</script>

<style>
.--pebcac-option-mount {
  color: black;
  display: grid;
  grid-template-columns: auto;
  align-items: center;
}

</style>