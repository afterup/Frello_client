<template>
	<button class="base-button" :disabled="disabled" @click="$emit('click')">
		<span v-if="badge" class="base-button__badge">
			<slot name="badge"></slot>
		</span>
		<span class="base-button__content">
			<slot />
		</span>
	</button>
</template>

<script>
export default {
	props: {
		badge: {
			type: Boolean,
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style lang="scss" scoped>
.base-button {
	display: flex;
	justify-content: center;
	padding: 0.35rem;
	margin-right: 0.4rem;
	border-radius: 3px;
	border: none;
	background-color: $color-primary-light;
	color: white;
	cursor: pointer;

	&:disabled {
		background-color: $color-grey-light-4;
		cursor: not-allowed;
	}

	&__badge {
		margin-right: 0.3rem;
	}

	&__content {
		font-size: 1.5rem;
		font-weight: bold;
	}
}
</style>
