<template>
	<div>
		<Textarea v-model="description" @update-description="updateDescription" />
		<div>
			{{ description }}
		</div>
		<hr />
		<ToggleTextarea
			v-model="description"
			@update-description="updateDescription"
			:maxlength="1000"
			:placeholder="{ blur: 'Add list', focus: 'Enter list' }"
		/>
	</div>
</template>

<script>
import { FETCH_CARD, UPDATE_CARD } from '@/store/actions.type';

export default {
	computed: {
		card() {
			return this.$store.getters['card'];
		},
		description: {
			get() {
				return this.card.description;
			},
			set(newDescription) {
				return newDescription;
			},
		},
	},
	created() {
		this.$store.dispatch(FETCH_CARD, 486);
	},
	components: {
		Textarea: () => import('./Textarea'),
		ToggleTextarea: () => import('@/components/ui/ToggleTextarea'),
	},
	methods: {
		updateDescription(value) {
			const cardData = {
				cardId: this.card.card_id,
				description: value,
				type: 'update',
			};

			this.$store.dispatch(UPDATE_CARD, cardData).then(() => {
				console.log('change');
			});
		},
	},
};
</script>

<style scoped>
div {
	margin-top: 5rem;
}
</style>
