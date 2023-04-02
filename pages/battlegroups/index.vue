<template>
  <div>
    <h1>This is the battlegroup page</h1>
		<v-card v-for="b in battlegroups" :to="`/battlegroups/${b.id}`" nuxt>
			<v-card-item>
				<v-card-title>
					{{ b.name }}
				</v-card-title>
				<template v-slot:append>
          <v-btn @click.prevent="deleteBattleGroup(b.id)"
            icon="$close"
            size="small"
            variant="text"
          ></v-btn>
        </template>
			</v-card-item>
		</v-card>
		<v-btn @click.prevent="addNewBattleGroup">New Battlegroup</v-btn>
  </div>
</template>

<script setup lang="ts">
import { BattleGroup } from '~~/models/battleGroup.model';
import { useBattleGroupStore } from '~~/store';

const battleGroupStore = useBattleGroupStore();
const battlegroups = ref<BattleGroup[]>([]);
onMounted(() => {
  battlegroups.value = battleGroupStore.battlegroups;
});
function addNewBattleGroup(){
	battleGroupStore.addNewBattleGroup()
}
function deleteBattleGroup(battleGroupId: string){
	battleGroupStore.deleteBattleGroup(battleGroupId)
}

</script>

<style scoped>

</style>