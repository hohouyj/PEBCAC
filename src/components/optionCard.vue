<template>
  <div class="--pebcac-option-card" :class="{
    weapon: optionStyle(option.optionType, 'weapon'),
    system: optionStyle(option.optionType, 'system'),
    tactic: optionStyle(option.optionType, 'tactic'),
    trait: optionStyle(option.optionType, 'trait'),
    escort: optionStyle(option.optionType, 'escort'),
    maneuver: optionStyle(option.optionType, 'maneuver'),
  }" @click="emit('selectOption', option)">
    <div v-if="props.option.name">
      <OptionHeader :option="option" @selectOption="emit('changeOption')" :showEditIcon="props.showEditIcon"/>
      <OptionBody :option="option" v-if="option.desc"/>
      <div v-if="option.options">
        <div v-for="(nestedOption, idx) in option.options" :key="idx" >
          <OptionCard :option="nestedOption" style="width:90%; align-self: right;" />
        </div>
      </div>

    </div>
    <div v-else>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import OptionHeader from './optionHeader.vue';
import OptionBody from './optionBody.vue'
export default defineComponent({
    name: "OptionCard",
    components: { OptionHeader, OptionBody}
})
</script>

<script setup lang="ts">
import { Option } from '@/models/option.model';
import { defineEmits, PropType, defineProps } from 'vue';

const props = defineProps({
  option: { type: Object as PropType<Option>, required: true },
  showEditIcon: {type: Boolean}
})

const emit = defineEmits<{
  (e: 'selectOption', option: Option): void,
  (e: 'changeOption'): void
}>()

const optionStyle = (optionType: string, styleType: string): boolean => {
  if (styleType === 'weapon') {
    return optionType === "Superheavy" || optionType === "Auxiliary" || optionType === "Primary"
  } else if (styleType === 'escort') {
    return optionType === 'Wing' || optionType === 'Escort'
  }
  return optionType.toLowerCase() === styleType
}


</script>

<style>
.--pebcac-option-card {
  width: clamp(20rem, 45rem, 90rem);
}


</style>
