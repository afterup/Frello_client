<template>
	<AppDrop @drop="moveCardOrList">
		<AppDrag
			class="list"
			:transferData="{
				type: 'list',
				fromListIndex: listIndex,
			}"
		>
			{{ list.title }}
			<ListCard
				v-for="(card, $cardIndex) of list.Cards"
				:key="card.card_id"
				:card="card"
				:cardIndex="$cardIndex"
				:list="list"
				:listIndex="listIndex"
			/>
		</AppDrag>
	</AppDrop>
</template>

<script>
import movingMixin from '@/mixins/movingMixin';

export default {
	components: {
		ListCard: () => import('@/test/ListCard'),
		AppDrop: () => import('@/test/AppDrop'),
		AppDrag: () => import('@/test/AppDrag'),
	},
	mixins: [movingMixin],
};
</script>

<style lang="scss" scoped>
.list {
	display: flex;
	width: 20rem;
	padding: 3rem;
	div {
		border: 1px solid grey;
	}
}
</style>
