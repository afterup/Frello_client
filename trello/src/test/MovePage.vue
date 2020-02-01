<template>
	<BaseContainer>
		<div class="move">
			<BoardList
				v-for="(list, $listIndex) of lists"
				:key="list.list_id"
				:list="list"
				:listIndex="$listIndex"
			/>
		</div>
	</BaseContainer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	components: {
		BoardList: () => import('@/test/BoardList'),
	},
	computed: {
		...mapGetters(['lists']),
	},
	created() {
		this.$store.dispatch('FETCH_BOARD', 60);
	},
};
</script>

<style lang="scss" scoped>
.move {
	display: flex;
	div {
		border: 1px solid grey;
	}
}
</style>
