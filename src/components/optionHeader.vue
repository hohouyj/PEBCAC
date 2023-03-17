<template>
  <div class="--pebcac-option-header" :class="{
    weapon: optionStyle(option.optionType, 'weapon'),
    system: optionStyle(option.optionType, 'system'),
    tactic: optionStyle(option.optionType, 'tactic'),
    trait: optionStyle(option.optionType, 'trait'),
    escort: optionStyle(option.optionType, 'escort'),
    maneuver: optionStyle(option.optionType, 'maneuver'),
  }">
    <div style="display: flex; ">
      <div style="font-size: 1.6rem; font-weight: bold; width: 100%;">{{ option.name }} </div>
      <font-awesome-icon v-if="showEditIcon" icon="fa-solid fa-rotate" class="clickable" style="font-size: 1.3rem; float: right; padding: 7px 3px 0px 0px ;" @click="emit('selectOption')"/>
    </div>
    <div style="font-size: 1rem; font-weight: normal;">{{ option.optionType }}{{ tags }}</div>
    <div>{{ rangeText }} {{ option.damage }} {{ pointText }}</div>
  </div>
</template>


<script setup lang="ts">
import { defineProps, PropType, computed, defineEmits } from 'vue';
import { Option } from '@/models/option.model';

const props = defineProps({
  option: { type: Object as PropType<Option>, required: true },
  showEditIcon: {type: Boolean}
})

const emit = defineEmits<{
  (e: 'selectOption'): void
}>()

const optionStyle = (optionType: string, styleType: string): boolean => {
  if (styleType === 'weapon') {
    return optionType === "Superheavy" || optionType === "Auxiliary" || optionType === "Primary"
  } else if (styleType === 'escort') {
    return optionType === 'Wing' || optionType === 'Escort'
  }
  return optionType.toLowerCase() === styleType
}

const tags = computed(() => {
  let tags = ''
  if (props.option.tags) {
    for (const tag of props.option.tags) {
      tags += ", "
      tags += tag
    }
  }
  return tags
})

const rangeText = computed(() => {
  let rangeText: string | null = null
  if (props.option.range) {
    rangeText = "[Range " + props.option.range.toString() + ']'
    rangeText = rangeText.replace(',', '-')
  }
  return rangeText
})

const pointText = computed(() => {
  let pointText: string | null = null
  if (props.option.points) {
    pointText = "[" + props.option.points.toString() + ' points]'
  }
  return pointText
})

const showEditIcon = computed(():boolean=>{
  return props.showEditIcon? props.showEditIcon:false
})


</script>

<style>
.--pebcac-option-header {
  padding: 0px 4px 2px 4px;
}

.--pebcac-option-header.weapon {
  color: var(--weapon-header-font-color);
  background-color: var(--weapon-header-bg-color);
}

.--pebcac-option-header.system {
  color: var(--system-header-font-color);
  background-color: var(--system-header-bg-color);
}

.--pebcac-option-header.escort {
  color: var(--escort-header-font-color);
  background-color: var(--escort-header-bg-color);
}

.--pebcac-option-header.maneuver {
  color: var(--maneuver-header-font-color);
  background-color: var(--maneuver-header-bg-color);
}

.--pebcac-option-header.tactic {
  color: var(--tactic-header-font-color);
  background-color: var(--tactic-header-bg-color);
}

.--pebcac-option-header.trait {
  color: var(--trait-header-font-color);
  background-color: var(--trait-header-bg-color);
}
</style>
