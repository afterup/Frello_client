<template>
	<div @drop.stop @dragenter.stop @dragover.stop>
		<AppDrop @drop="moveCardOrList">
			<AppDrag
				class="list__item"
				:transferData="{
					type: 'list',
					fromListIndex: listIndex,
				}"
			>
				<div class="list__item__header">
					<ToggleTextarea
						v-model="listTitle"
						:maxlength="500"
						@update="updateList"
					/>

					<div @click="deleteList(list.list_id)">
						<i slot="button" class="material-icons delete-icon">close</i>
					</div>
				</div>
				<ul class="list__item__body">
					<li v-for="(card, $cardIndex) of list.Cards" :key="card.card_id">
						<ListCard
							:card="card"
							:cardIndex="$cardIndex"
							:list="list"
							:listIndex="listIndex"
						/>
					</li>
				</ul>
				<div
					class="list__item__footer"
					@drop.stop
					@dragenter.stop
					@dragover.stop
				>
					<ToggleTextarea
						v-model="cardTitle"
						:placeholder="{
							focus: 'Enter a title for this card...',
							blur: '➕ Add another card',
						}"
						:maxlength="500"
						@update="createCard"
					/>
					<!-- <div v-if="submitButton" class="textarea-field__textarea__button">
			<BaseBtn class="submit" @click="clickAddButton">Add</BaseBtn>
			<BaseBtn class="close" @click="handleTextareaToggle">Close</BaseBtn>
		</div> -->
				</div>
			</AppDrag>
		</AppDrop>
	</div>
</template>

<script>
import movingMixin from '@/mixins/movingMixin';
import { UPDATE_LIST, DELETE_LIST, PUBLISH_CARD } from '@/store/actions.type';

export default {
	name: 'board-list',
	data() {
		return {
			cardTitle: '',
			showHeaderDropdown: false,
		};
	},
	mixins: [movingMixin],
	components: {
		ListCard: () => import('@/components/board/ListCard.vue'),
		AppDrop: () => import('@/components/drag/AppDrop'),
		AppDrag: () => import('@/components/drag/AppDrag'),
	},
	computed: {
		listTitle: {
			get() {
				return this.list.title;
			},
			set(newTitle) {
				return newTitle;
			},
		},
	},
	methods: {
		updateList(value) {
			const listData = {
				list_id: this.list.list_id,
				title: value,
			};

			this.$store.dispatch(UPDATE_LIST, listData);
		},
		deleteList(id) {
			this.$store.dispatch(DELETE_LIST, id);
		},
		createCard(value) {
			const cardData = {
				list_id: this.list.list_id,
				title: value,
			};

			this.$store.dispatch(PUBLISH_CARD, cardData).then(() => {
				this.cardTitle = '';
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.list-wrap {
	display: flex;
	flex-wrap: nowrap;
	margin: 0 2rem;
}

.list {
	display: flex;

	> * {
		flex: 0 0 auto;
	}

	&::after {
		content: '';
		flex: 0 0 auto;
	}

	&__item {
		display: flex;
		flex-direction: column;
		width: 26rem;
		max-height: 80vh;
		margin: 0.3rem;
		padding: 0.6rem;

		background-color: #ebecf0;
		border-radius: 2.5px;

		&:hover {
			cursor: pointer;
		}

		&__header {
			display: flex;
			justify-content: space-between;
			background-color: #ebecf0;
		}

		&__body {
			overflow-y: scroll;
			min-height: 1rem;
			max-height: 70vh;

			&::-webkit-scrollbar {
				width: 6px;
				height: 10px;
			}
			&::-webkit-scrollbar-track {
				border-radius: 10px;
				background-color: rgb(231, 231, 231);
			}

			&::-webkit-scrollbar-thumb {
				border-radius: 9px;
				background-color: rgb(201, 201, 201);
			}
		}

		&__footer {
			margin-top: 0.5rem;
		}
	}
}

.delete-icon {
	padding: 0.5rem;
	font-size: 2rem;
	color: $color-grey-dark-2;

	&:hover {
		background-color: rgba(155, 155, 155, 0.219);
	}
}
</style>
