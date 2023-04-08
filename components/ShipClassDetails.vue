<template>
	<v-expansion-panel :title="`${shipClass.shipPrefix} ${shipClass.class} ${shipClass.type}`">
		<v-expansion-panel-text>
			<v-card>
				<v-card-item>
					<v-card-title>
						Points: {{ shipClass.points }} Hp: {{ shipClass.hp }} Defense: {{ shipClass.defense }}
					</v-card-title>
					<template v-slot:append>
						<v-btn icon="mdi-check" size="small" variant="text" @click.prevent="changeShipClass(shipClass)"></v-btn>
					</template>
					<v-chip close v-for="mount in shipClass.mounts">{{ mount.types[0] }}</v-chip>
				</v-card-item>
				<TraitCard v-for="trait in shipClass.traits" :trait="trait" />
			</v-card>
		</v-expansion-panel-text>
	</v-expansion-panel>
</template>

<script setup lang="ts">
import { ShipClass } from '~~/models/ship.model';

const emit = defineEmits<{
  (e: 'changeShipClass', shipClass: ShipClass): void
}>()


function changeShipClass(shipClass: ShipClass){
	console.log(shipClass)
	emit('changeShipClass', shipClass)
}

const props = defineProps({
	shipClass: { type: Object as PropType<ShipClass>, required: true }
})

</script>

<style scoped></style>