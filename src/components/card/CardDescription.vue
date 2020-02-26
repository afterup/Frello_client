<template>
	<div class="description">
		<div class="description__title">
			<i class="material-icons">subject</i>
			<span>Description</span>
		</div>
		<div class="description__body">
			<ToggleTextarea
				v-model="card.description"
				:type="'description'"
				:maxlength="1000"
				:placeholder="'Add a more detailed description...'"
				@update="updateDescription"
			/>
		</div>
	</div>
</template>

<script>
import { UPDATE_CARD } from '@/store/actions.type';

export default {
	props: {
		card: {
			type: Object,
			requred: true,
		},
	},
	methods: {
		updateDescription(value) {
			const cardData = {
				cardId: this.card.card_id,
				description: value,
				type: 'update',
			};
			this.$store.dispatch(UPDATE_CARD, cardData);
		},
	},
};
</script>

<style lang="scss" scoped>
.description {
	width: 40rem;
	height: 40rem;

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
		width: 95%;
		font-size: 1.3rem;
		border-radius: 2px;
	}
}
</style>
