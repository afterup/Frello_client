<template>
	<div class="card">
		<div class="card__header">
			<i class="material-icons">class</i>
			<BaseInput
				class="card__header__title"
				:toggle="true"
				:type="'text'"
				v-model="card.title"
				@enter="updateTitle"
			>
				{{ card.title }}
			</BaseInput>
			<div class="card__header__title"></div>
		</div>
		<div class="card__description">
			<i class="material-icons">
				subject
			</i>
			<div class="card__description__body">
				Description
				<div class="card__description__body__box">
					<BaseInput
						:toggle="true"
						:placeholder="checkDescription()"
						:type="'textarea'"
						v-model="card.description"
						@enter="updateDescription"
					>
						{{ checkDescription() }}
					</BaseInput>
				</div>
				<BaseBtn @click="deleteCard" :badge="true" class="delete">
					<i class="material-icons" slot="badge">
						delete_sweep
					</i>
					Delete
				</BaseBtn>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['card']),
	},
	created() {
		this.$store.dispatch('FETCH_CARD', this.$route.params.cardId);
	},
	destroyed() {
		this.$store.commit('DESTROY_CARD');
	},
	methods: {
		updateDescription() {
			this.$store.dispatch('UPDATE_CARD', {
				cardId: this.card.card_id,
				description: this.card.description,
			});
		},
		updateTitle() {
			this.$store.dispatch('UPDATE_CARD', {
				cardId: this.card.card_id,
				title: this.card.title,
			});
		},
		checkDescription() {
			return this.card.description
				? this.card.description
				: 'Add a more detailed description';
		},
		deleteCard() {
			this.$store.dispatch('DELETE_CARD', this.card.card_id).then(() => {
				this.$store.commit('CLOSE_MODAL');
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
	width: 50rem;
	height: 60vh;

	&__header {
		display: flex;

		&__title {
			font-size: 1.8rem;
			font-weight: bold;
		}
	}

	&__description {
		display: flex;
		flex-direction: row;
		margin-top: 20px;

		&__body {
			display: flex;
			flex-direction: column;
			font-size: 1.8rem;
			font-weight: bold;

			&__box {
				border: none;
				border-radius: 2px;
				background-color: #e1e4e9;
				width: 40rem;
				resize: none;

				&:hover {
					background-color: rgb(218, 218, 218);
				}
			}
		}
	}
}
</style>
