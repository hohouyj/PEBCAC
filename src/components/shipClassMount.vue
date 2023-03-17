<template>
  <div style="display: flex; flex-flow: wrap;">
    <ShipClassCard :shipClass="shipClass" @selectShipClass="toggleSelect"/>
    <div v-for="(mount, idx) in shipClass.mounts" :key="idx">
      <OptionMount :mount="mount" :battleGroupId="battleGroupId" :shipId="shipId" />
    </div>
    <div v-if="state.selecting">
      <ShipClassSelector :shipClassList="frigates" @equipShipClass="equipShipClass"/>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ShipClass } from '@/models/ship.model';
import { useMainStore } from '@/store';
import { PropType, defineProps, reactive } from 'vue';
import OptionMount from './optionMount.vue';
import ShipClassCard from './shipClassCard.vue';
import ShipClassSelector from './shipClassSelector.vue';
import FrigateJson from '../data/frigates.json'

const props = defineProps({
  shipClass: { type: Object as PropType<ShipClass>, required: true },
  shipId: { type: String, required: true },
  battleGroupId: { type: String, required: true }
})

const state = reactive({
  selecting: false
})
const mainStore = useMainStore()
const frigates = FrigateJson.frigates as ShipClass[]
function toggleSelect() {
  state.selecting = !state.selecting
}
function equipShipClass(shipClass: ShipClass) {
  toggleSelect()
  mainStore.selectShipClass(props.battleGroupId, props.shipId, shipClass)
}
</script>