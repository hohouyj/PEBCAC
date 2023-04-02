<template>
	<v-card>
		<v-card-title>
      Ships
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
		<v-data-table
			:headers = "headers"
			:items = "allOptions.ships"
			:sort-by="[{key: 'points', order:'asc'}]"
			:search="search"
			hide-default-footer
			:items-per-page="100"
		><template v-slot:item="{ item }">
				<tr>
					<td>{{ item.columns.points }}</td>
					<td>{{ item.columns.class }}</td>
					<td>{{ item.columns.type }}</td>
					<td>
						<TraitCard v-for="t in item.columns.traits" :trait="t"/>
					</td>
					<td>
						<v-chip v-for="m in item.columns.mounts">
							{{ m.types[0] }}
						</v-chip></td>
				</tr>
			</template>
		</v-data-table>
</v-card>
</template>

<script setup lang="ts">
import allOptions from '../../data/ships.json'
const headers = [
	{
		title: "Points",
		key: 'points'
	},
	{
		title: "Name",
		align: 'start',
		key: 'class'
	},
	{
		title: "Type",
		key: 'type'
	},
	{
		title: "Traits",
		key: 'traits'
	},
	{
		title: "Mounts",
		key: 'mounts'
	}
]
const search = ref('')
</script>

<style scoped>

</style>