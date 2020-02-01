<template>
	<AppDrop @drop="moveCardOrList">
		<AppDrag
			class="card"
			:transferData="{
				type: 'card',
				fromListIndex: listIndex,
				fromCardIndex: cardIndex,
			}"
			@click="goToCard(card)"
		>
			{{ card.title }}
		</AppDrag>
	</AppDrop>
</template>

<script>
import { mapGetters } from 'vuex';
import movingMixin from '@/mixins/movingMixin';

export default {
	props: {
		card: {
			type: Object,
			required: true,
		},
		cardIndex: {
			type: Number,
			required: true,
		},
	},
	mixins: [movingMixin],
	components: {
		AppDrop: () => import('@/test/AppDrop'),
		AppDrag: () => import('@/test/AppDrag'),
	},
	computed: {
		...mapGetters(['lists']),
	},
};
</script>

<style></style>
