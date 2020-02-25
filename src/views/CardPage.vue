<template>
	<div class="card">
		<loading-indicator v-if="isCardLoading" />
		<div class="card__header">
			<i class="material-icons">class</i>
			<ToggleText
				class="card__header__title"
				v-model="card.title"
				:maxlength="500"
				@enter="updateTitle"
			/>
		</div>
		<div class="card__body">
			<CardDescription :card="card" />
			<div class="vl"></div>
			<div class="card__body__info">
				<div class="card__body__info__created">
					<i class="material-icons clock-icon">access_time</i>
					Created At
				</div>
				<div>{{ card.createdAt }}</div>
				<BaseBtn @click="deleteCard" class="delete">
					<i class="material-icons" slot="badge">delete_sweep</i>
					Delete
				</BaseBtn>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '@/store';
import { FETCH_CARD, UPDATE_CARD, DELETE_CARD } from '@/store/actions.type';
import { DESTROY_CARD, CLOSE_MODAL } from '@/store/mutations.type';

export default {
	name: 'card-content',
	computed: {
		...mapGetters(['card', 'isCardLoading']),
	},
	components: {
		CardDescription: () => import('@/components/board/CardDescription'),
	},
	beforeRouteEnter(to, from, next) {
		store.dispatch(FETCH_CARD, to.params.cardId).then(() => {
			next();
		});
	},
	destroyed() {
		this.$store.commit(DESTROY_CARD);
	},
	methods: {
		updateTitle() {
			const cardData = {
				cardId: this.card.card_id,
				title: this.card.title,
				type: 'update',
			};
			this.$store.dispatch(UPDATE_CARD, cardData);
		},

		deleteCard() {
			this.$store.dispatch(DELETE_CARD, this.card.card_id).then(() => {
				this.$store.commit(CLOSE_MODAL);
				this.$router.push({
					name: 'board',
					params: { board_id: this.$route.params.id },
				});
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.card {
	width: 100%;
	height: 100%;

	&__header {
		display: flex;

		&__title {
			font-size: 1.8rem;
			font-weight: bold;
		}
	}
	&__body {
		display: flex;
		margin-top: 2rem;

		.vl {
			border-left: 2px solid grey;
			margin-right: 1rem;
		}

		&__info {
			width: 15rem;
			&__created {
				display: flex;
				align-items: center;

				margin-bottom: 1rem;
				font-size: 1.3rem;
				font-weight: bold;

				.clock-icon {
					font-size: 2rem;
				}
			}

			.delete {
				width: 100%;
				margin-top: 32rem;
				color: grey;
				background-color: white;
				border: 1px solid grey;

				&:hover {
					background-color: $color-grey-light-3;
				}
			}
		}
	}
}
</style>
