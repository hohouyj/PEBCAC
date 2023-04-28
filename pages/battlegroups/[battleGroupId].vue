<template>
  <div class="w-100">
    <div class="text-3xl pb-2 pt-1 text-center max-w-full d-flex justify-center">
      <v-text-field class="max-w-sm" ref="renameInput"
        :placeholder="getBattleGroupById(battleGroupId.toString()).name" v-if="isRenameing" v-model="newName"
        @blur="renameBattleGroup" @keyup.enter="renameBattleGroup" variant="underlined">
      </v-text-field>

      <h1 v-else @click="showRenameInput">
        {{ getBattleGroupById(battleGroupId.toString()).name }}
      </h1>

      
    </div>
    <div class="pb-5">
      <v-btn block v-if="getBattleGroupById(battleGroupId.toString()).shipIds.length > 0" @click="addNewShipToBattleGroup">Add
      Ship</v-btn>
    <v-btn v-else @click="addFlagShipToBattleGroup">Add Flagship</v-btn>
    </div>
    
    
    <div v-if="getBattleGroupById(battleGroupId.toString()).shipIds.length > 0"
      class="d-flex flex-wrap w-100 content-center justify-center">
      <ShipCard v-for="shipId in getBattleGroupById(battleGroupId.toString()).shipIds" v-bind:key="shipId"
        :shipId="shipId" class="mx-5 mb-3" />
    </div>

    

  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBattleGroupStore } from '~~/store';

const { battleGroupId } = useRoute().params
const battleGroupStore = useBattleGroupStore()
const { getBattleGroupById } = storeToRefs(battleGroupStore)

const isRenameing = ref(false)

const newName = ref('')

function addNewShipToBattleGroup() {
  battleGroupStore.addNewShipToBattleGroup(battleGroupId.toString())
}

function addFlagShipToBattleGroup() {
  battleGroupStore.addFlagShipToBattleGroup(battleGroupId.toString())
}

function renameBattleGroup() {
  battleGroupStore.renameBattleGroup(battleGroupId, newName.value)
  isRenameing.value = false
  newName.value = ''
}

const renameInput = ref<HTMLInputElement | null>(null)

async function showRenameInput() {
  isRenameing.value = true
  await nextTick()
  renameInput.value?.focus()
}

definePageMeta({
  layout: 'battlegroups'
})
</script>

<style scoped></style>