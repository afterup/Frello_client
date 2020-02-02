<template>
	<div class="card">
		<div class="card__header">
			<i class="material-icons">class</i>
			<BaseInput
				class="card__header__title"
				:type="'text'"
				:kind="'toggle'"
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
						:placeholder="checkDescription()"
						:type="'textarea'"
						:kind="'toggle'"
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
		width: 100%;
		margin-top: 20px;

		&__body {
			width: 50rem;
			font-size: 1.8rem;
			font-weight: bold;
		}
	}
}
</style>
