<template>
  <div class="--pebcac-option-selector">
    <div class="--pebcac-option-selector-options">
      <div v-for="(option, idx) in validOptionsList" :key="idx">
        <div class="--pebcac-option-selector-list" @click="selectOption(option)">>> {{ option.name }} {{ option.points }} points</div>
      </div>
    </div>
    <div class="--pebcac-option-selector-option">
      <div v-if="state.selectedOption.name">
        <OptionCard :option="state.selectedOption" />
        <button class="--pebcac-option-selector-equip" @click="emit('equipOption', state.selectedOption)">Equip</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, reactive, defineEmits } from 'vue';
import { Option } from '@/models/option.model';
import OptionCard from './optionCard.vue';

const emit = defineEmits<{
  (e: 'equipOption', option: Option): void
}>()

const props = defineProps({
  validOptionsList: { type: Object as PropType<Option[]>, required: true }
})

const state = reactive({
  selectedOption: props.validOptionsList[0] as Option
})

function selectOption(option: Option) {
  state.selectedOption = option
}

</script>

<style>
.--pebcac-option-selector{
  border: 1px solid black;
  display: grid;
  grid-template-columns: auto;
  align-items: center;
}

.--pebcac-option-selector-option{
  display: grid;
  align-items: center;
}

.--pebcac-option-selector-equip{
  width: 100%;
  font-size: 1.2rem;
}

</style>