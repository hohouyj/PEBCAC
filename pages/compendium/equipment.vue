<template>
	<v-card>
		<v-card-title>
      Options
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
			:items = "allOptions.options"
			:sort-by="[{key: 'points', order:'desc'}]"
			:search="search"
			hide-default-footer
			:items-per-page="100"
		><template v-slot:item="{ item }">
				<tr>
					<td>{{ item.columns.name }}</td>
					<td>{{ item.columns.optionType }}</td>
					<td>{{ item.columns.points }}</td>
					<td>
						<v-chip v-for="tag in item.columns.tags">{{ tag }}</v-chip>
					</td>
				</tr>
			</template>
		</v-data-table>
</v-card>
</template>

<script setup lang="ts">
import allOptions from '../../data/options.json'
const headers = [
	{
		title: "Name",
		align: 'start',
		key: 'name'
	},
	{
		title: "Type",
		key: 'optionType'
	},
	{
		title: "Points",
		key: 'points'
	},
	{
		title: "Tags",
		key: 'tags'
	}
]
const search = ref('')
</script>

<style scoped>

</style>