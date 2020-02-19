<template>
	<button class="base-button" :disabled="disabled" @click="$emit('click')">
		<slot class="base-button__badge" name="badge"></slot>
		<span class="base-button__content" v-if="!icon">
			<slot />
		</span>
	</button>
</template>

<script>
export default {
	name: 'base-btn',
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		icon: {
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
	align-items: center;
	padding: 0.35rem;
	margin-right: 0.4rem;
	border-radius: 3px;
	border: none;
	background-color: $color-primary-light;
	color: white;

	&:hover {
		cursor: pointer;
	}

	&:disabled {
		background-color: $color-grey-light-4;
		cursor: not-allowed;
	}

	&__content {
		font-size: 1.5rem;
		font-weight: bold;
	}
}
</style>
