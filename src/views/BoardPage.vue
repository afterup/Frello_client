<template>
	<BoardContainer :background="board.background">
		<BoardMeta slot="meta" :board="board" :currentUser="currentUser" />
		<div class="board-list">
			<BoardList
				v-for="(list, $listIndex) of lists"
				:key="list.list_id"
				:list="list"
				:listIndex="$listIndex"
			/>
			<div class="board-list__input">
				<BaseInput
					v-model="listTitle"
					:type="'text'"
					:kind="'toggle'"
					:placeholder="'Enter a title for this list...'"
					@enter="createList"
				>
					<i class="material-icons" slot="badge">add</i>
					Add another list
				</BaseInput>
			</div>
		</div>
		<Modal v-if="showModal" @close="closeCard" :type="'card'">
			<router-view></router-view>
		</Modal>
	</BoardContainer>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import { FETCH_BOARD, PUBLISH_LIST } from '@/store/actions.type';
import { CLOSE_MODAL } from '@/store/mutations.type';

export default {
	name: 'board-page',
	data() {
		return {
			listTitle: '',
		};
	},
	components: {
		BoardContainer: () => import('@/components/board/BoardContainer.vue'),
		BoardMeta: () => import('@/components/board/BoardMeta.vue'),
		BoardList: () => import('@/components/board/BoardList.vue'),
		Modal: () => import('@/components/modal/Modal.vue'),
	},
	beforeRouteEnter(to, from, next) {
		store.dispatch(FETCH_BOARD, to.params.id).then(() => {
			next();
		});
	},
	computed: {
		...mapGetters(['board', 'lists', 'currentUser', 'showModal']),
	},
	methods: {
		closeCard() {
			this.$store.commit(CLOSE_MODAL);
			this.$router.push({
				name: 'board',
				params: { id: this.$route.params.id },
			});
		},
		createList() {
			const listData = {
				title: this.listTitle,
				board_id: this.$route.params.id,
			};

			this.$store.dispatch(PUBLISH_LIST, listData).then(() => {
				this.listTitle = '';
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/lib/styles/_boardPalette';
.board-list {
	display: flex;
	flex-wrap: nowrap;

	&__input {
		min-width: 24rem;
	}
}

// .fade-enter .fade-leave-to {
// 	opacity: 0;
// }

// .fade-enter-active .fade-leave-active {
// 	transition: opacity 2s ease-in;
// }
</style>
