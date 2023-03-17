<template>
  <div class="--pebcac-option-body" :class="{
        weapon: optionStyle(option.optionType, 'weapon'),
        system: optionStyle(option.optionType, 'system'),
        tactic: optionStyle(option.optionType, 'tactic'),
        trait: optionStyle(option.optionType, 'trait'),
        escort: optionStyle(option.optionType, 'escort'),
        maneuver: optionStyle(option.optionType, 'maneuver'),
      }">
        <p>{{ props.option.desc }}</p>
  </div>
</template>

<script setup lang="ts">

import { Option } from '@/models/option.model';
import {  PropType, defineProps } from 'vue';

const props = defineProps({
  option: { type: Object as PropType<Option>, required: true },
})

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

.--pebcac-option-body {
  padding: 0px 4px 2px 4px;
  border: 1px solid rgba(0, 0, 0, 0);
}
.--pebcac-option-body.weapon {
  color: var(--weapon-body-font-color);
  background-color: var(--weapon-body-bg-color);
}

.--pebcac-option-body.system {
  color: var(--system-body-font-color);
  background-color: var(--system-body-bg-color);
}

.--pebcac-option-body.escort {
  color: var(--escort-body-font-color);
  background-color: var(--escort-body-bg-color);
}

.--pebcac-option-body.maneuver {
  color: var(--maneuver-body-font-color);
  background-color: var(--maneuver-body-bg-color);
}

.--pebcac-option-body.tactic {
  color: var(--tactic-body-font-color);
  background-color: var(--tactic-body-bg-color);
}

.--pebcac-option-body.trait {
  color: var(--trait-body-font-color);
  background-color: var(--trait-body-bg-color);
}
</style>