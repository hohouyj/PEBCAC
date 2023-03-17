<template>
  <div class="--pebcac-ship-class-selector">
    <div>
      <div v-for="(shipClass, idx) in props.shipClassList" :key="idx">
        <div class="--pebcac-ship-class-selector-list" @click="selectShipClass(shipClass)">{{ shipClass.class }}</div>
      </div>
    </div>
    <div>
      <div v-if="state.selectedShipClass.class">
        <ShipClassCard :shipClass="state.selectedShipClass"/>
        <button @click="equipShipClass(state.selectedShipClass)">Equip</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits, reactive, onUpdated } from 'vue';
import { ShipClass } from '@/models/ship.model';
import ShipClassCard from './shipClassCard.vue';

const emit = defineEmits<{
  (e: 'equipShipClass', shipClass: ShipClass): void
}>()
const props = defineProps({
  shipClassList: { type: Object as PropType<ShipClass[]>, required: true }
})
const state = reactive({ selectedShipClass: props.shipClassList[0] })
function selectShipClass(shipClass: ShipClass){
  state.selectedShipClass = shipClass
}
function equipShipClass(shipClass: ShipClass){
  emit('equipShipClass', shipClass)
}
onUpdated(() => {
  console.log("Hello")
  
})
</script>