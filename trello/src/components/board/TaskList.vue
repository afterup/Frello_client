<template>
	<div class="list__item__content">
		<draggable
			:list="list.Cards"
			class="card"
			ghost-class="ghost"
			group="card"
			:move="moveCard"
			@end="endCard"
		>
			<div v-for="card in list.Cards" :key="card.card_id">
				<Task :card="card" />
			</div>
		</draggable>
	</div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
	data() {
		return {
			moveEvent: {},
		};
	},
	props: {
		list: {
			type: Object,
			required: true,
		},
	},
	components: {
		Task: () => import('@/components/board/Task.vue'),
		draggable,
	},
	methods: {
		moveCard: function(evt, originalEvent) {
			console.log(evt);
			const { relatedContext, draggedContext } = evt;

			this.moveEvent = {
				relatedContext,
				draggedContext,
			};
		},
		endCard: function(evt) {
			console.log(this.moveEvent);
			this.$store.dispatch('MOVE_CARD', {
				evt: this.moveEvent,
			});
		},
	},
};
</script>

<style></style>
