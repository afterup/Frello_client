<template>
	<div class="card">
		<div class="card__header">
			<i class="material-icons">class</i>
			<ToggleInput
				v-model="cardTitle"
				class="card__header__title"
				:type="'text'"
				@enter="updateTitle"
			>
				{{ card.title }}
			</ToggleInput>
		</div>
		<div class="card__description">
			<div class="card__description__title">
				<i class="material-icons">subject</i>
				<span>Description</span>
			</div>
			<div class="card__description__body">
				<ToggleInput
					:placeholder="checkDescription()"
					:type="'textarea'"
					v-model="cardDescription"
					@enter="updateDescription"
				>
					{{ checkDescription() }}
				</ToggleInput>
			</div>
		</div>
		<BaseBtn @click="deleteCard" :icon="true" class="delete">
			<i class="material-icons" slot="badge">
				delete_sweep
			</i>
			Delete
		</BaseBtn>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			cardTitle: '',
			cardDescription: '',
		};
	},
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
		margin-top: 20px;

		&__title {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			span {
				font-size: 1.8rem;
				font-weight: bold;
			}
		}

		&__body {
			width: 100%;
			font-size: 1.3rem;
			border-radius: 2px;
		}
	}
}
</style>
