<template>
	<AppDrop @drop="moveCardOrList">
		<AppDrag
			:transferData="{
				type: 'card',
				fromListIndex: listIndex,
				fromCardIndex: cardIndex,
			}"
		>
			<router-link
				class="card"
				:to="`/board/${this.$route.params.id}/card/${card.card_id}`"
				tag="div"
			>
				<div class="card__title">
					{{ card.title }}
				</div>
			</router-link>
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
		AppDrop: () => import('@/components/drag/AppDrop'),
		AppDrag: () => import('@/components/drag/AppDrag'),
	},
	computed: {
		...mapGetters(['lists']),
	},
};
</script>

<style lang="scss" scoped>
.card {
	border-radius: 2px;
	width: 24rem;
	height: auto;
	padding: 0.5rem 0;
	margin-bottom: 8px;

	background-color: white;
	box-shadow: 0px 1.3px rgb(182, 182, 182);

	&:hover {
		background-color: rgb(240, 240, 240);
		cursor: pointer;
	}
	&__title {
		margin-left: 8px;
		font-size: 1.3rem;

		word-break: keep-all;
		word-wrap: break-word;
	}
}
</style>
