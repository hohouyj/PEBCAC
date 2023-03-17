<template>
  <div class="--pebcac-ship-class">
    <div
      class="--pebcac-ship-class-header"
      :class="shipClass.shipPrefix.toLowerCase()"
    >
      <div style="width: 97%; font-size: 1.2rem">
        {{ shipClass.shipPrefix }} {{ props.shipClass.class }}
      </div>
      <font-awesome-icon
        v-if="state.showEditIcon"
        icon="fa-solid fa-rotate"
        class="clickable"
        style="font-size: 1.3rem; float: right; padding: 4px 4px 4px 0px"
        @click="emit('selectShipClass')"
      />
    </div>

    <div class="--pebcac-ship-class-body">
      <div style="font-size: 1.2rem;">
        Points {{ shipClass.points }}, 
        Defense {{ shipClass.defense }}, 
        HP {{ shipClass.hp }}
      </div>
      <div style="display: flex; flex-wrap: wrap;">
      <OptionCard
        :option="trait"
        v-for="(trait, idx) in shipClass.traits"
        :key="idx"
      />
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, reactive, defineEmits } from "vue";
import { ShipClass } from "@/models/ship.model";
import OptionCard from "./optionCard.vue";
const props = defineProps({
  shipClass: { required: true, type: Object as PropType<ShipClass> },
});

const emit = defineEmits<{
  (e: "selectShipClass"): void;
}>();

const state = reactive({
  showEditIcon: true,
});
</script>

<style>
.--pebcac-ship-class {
  border: 1px solid black;
  background-color: var(--ship-bg-color);
  color: black;
  width: fit-content;
}
.--pebcac-ship-class-header {
  color: white;
  display: flex;
  padding-left: 10px;
  width: 100%;
}
.--pebcac-ship-class-header.ips-n {
  background-color: var(--ship-ipsn-bg-color);
}
.--pebcac-ship-class-header.ha {
  background-color: var(--ship-ha-bg-color);
}
.--pebcac-ship-class-header.fks {
  background-color: var(--ship-fks-bg-color);
}
.--pebcac-ship-class-header.ssc {
  background-color: var(--ship-ssc-bg-color);
}
.--pebcac-ship-class-header.gms {
  background-color: var(--ship-gms-bg-color);
}
.--pebcac-ship-class-body {
  padding: 10px;
}
</style>
