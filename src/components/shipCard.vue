<template>
  <div class="--pebcac-ship-card">
    <div class="--pebcac-ship-card-header">
      <div
        v-if="!state.editingName"
        @click="editName"
        style="font-size: 2rem; font-weight: bold; width: fit-content; padding: 0px 0px 2px 10px;"
      >
        {{ ship.name }}
      </div>
      <input
        style="height: 3rem; font-size: 3rem; font-weight: bold"
        ref="nameInput"
        v-if="state.editingName"
        @blur="saveName()"
        :placeholder="ship.name"
      />
    </div>
    <ShipClassMount
      :ship-class="ship.shipClass"
      :battleGroupId="battleGroupId"
      :ship-id="ship.id"
      style="padding: 10px 10px;"
    />
  </div>
</template>

<script setup lang="ts">
import { Ship } from "@/models/ship.model";
import { useMainStore } from "@/store";
import { PropType, defineProps, reactive, InputHTMLAttributes, ref } from "vue";
import ShipClassMount from "./shipClassMount.vue";

const nameInput = ref<InputHTMLAttributes>();
const mainStore = useMainStore();

const props = defineProps({
  ship: { type: Object as PropType<Ship>, required: true },
  battleGroupId: { type: String, required: true },
});

const state = reactive({
  editingName: false,
});

function editName() {
  state.editingName = true;
}
function saveName() {
  if (nameInput.value) {
    if (nameInput.value.value != "") {
      mainStore.editShipName(
        props.battleGroupId,
        props.ship.id,
        nameInput.value.value
      );
    }
  }
  state.editingName = false;
}
</script>


<style>
.--pebcac-ship-card{
  background: var(--ship-bg-color);
  color: black;
}
.--pebcac-ship-card-header{
background-color: var(--ship-gms-bg-color);
color: white;
}

</style>