<template>
  <div class="--pebcac-battle-group">
    <div class="--pebcac-battle-group-header">
      <div
        v-if="!state.editingName"
        @click="editName"
        style="
          font-size: 3rem;
          font-weight: bold;
          width: fit-content;
          padding: 0px 0px 2px 10px;
        "
      >
        {{ battleGroup.name }}
      </div>
      <input
        style="height: 3rem; font-size: 3rem; font-weight: bold"
        ref="nameInput"
        v-else
        @blur="saveName()"
        :placeholder="battleGroup.name"
      />
      <font-awesome-icon
        icon="fa-solid fa-trash"
        class="clickable"
        style="font-size: 1.5rem; float: right; padding: 13px 0px 0px 0px"
        @click="deleteBattleGroup(battleGroup.id)"
      />
    </div>
    <div>POINTS {{ battleGroup.points }}</div>
    <br />
    <button @click="addNewShip(battleGroup.id)">ADD SHIP</button>
    <div v-for="(ship, idx) in battleGroup.ships" :key="idx">
      <ShipCard :ship="ship" :battleGroupId="battleGroup.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BattleGroup } from "@/models/battleGroup.model";
import { useMainStore } from "@/store";
import {
  defineProps,
  onMounted,
  ref,
  PropType,
  reactive,
InputHTMLAttributes,
} from "vue";
import ShipCard from "./shipCard.vue";

const nameInput = ref<InputHTMLAttributes>();
const nameInputElement = ref<HTMLElement>();
const props = defineProps({
  battleGroup: {
    required: true,
    type: Object as PropType<BattleGroup>,
  },
});
const state = reactive({ editingName: false });
const battleGroups = ref<BattleGroup[]>([]);
const mainStore = useMainStore();
onMounted(() => {
  battleGroups.value = mainStore.battleGroups;
});
function addNewShip(battleGroupId: string) {
  mainStore.addNewShip(battleGroupId);
}
function deleteBattleGroup(battleGroupId: string) {
  mainStore.deleteBattleGroup(battleGroupId);
}
function editName() {
  state.editingName = true;
  nameInputElement.value?.focus()
}
function saveName() {
  if (nameInput.value) {
    if (nameInput.value.value != "") {
      mainStore.editBattleGroupName(
        props.battleGroup.id,
        nameInput.value.value
      );
    }
  }
  state.editingName = false;
}
</script>

<style>
.--pebcac-battle-group {
  color: black;
  background-color: var(--ship-bg-color);
  max-width: 100rem;
  margin-right: 10px;
}

.--pebcac-battle-group-header {
  color: white;
  background-color: var(--ship-gms-bg-color);
  display: grid;
  grid-template-columns: auto 40px;
}
</style>
