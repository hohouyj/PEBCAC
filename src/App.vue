<template>
  <div class="app">
    
    <div style="display: flex; flex-wrap: wrap;">
      <BattleGroupCard v-for="(battleGroup, idx) in battleGroups" :key="idx" :battle-group="battleGroup" />
    </div>
    <button @click="addNewBattleGroup">Add New BattleGroup</button>
  </div>
</template>

<script setup lang="ts">
import BattleGroupCard from './components/battleGroupCard.vue';
import { useMainStore } from '@/store';
import optionJson from './data/options.json'
import { Option } from './models/option.model';

const mainStore = useMainStore()
const battleGroups = mainStore.battleGroups
function addNewBattleGroup() {
  mainStore.addNewBattleGroup()
}
const optionExample: Option = optionJson.options[23]




</script>

<style>
.app{
  display: grid;
  grid-template-columns: auto auto;
}


</style>
