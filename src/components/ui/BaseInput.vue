<template>
	<div class="base-field">
		<label class="base-field__label" :for="label">{{ label }}</label>
		<input
			class="base-field__input"
			:id="label"
			:type="type"
			:placeholder="placeholder"
			:value="value"
			:autocomplete="type === 'password'"
			:maxlength="maxlength"
			@input="updateValue($event.target.value)"
			@keyup.enter="$emit('enter')"
		/>
	</div>
</template>

<script>
import inputMixin from '@/mixins/inputMixin';

export default {
	name: 'base-input',
	mixins: [inputMixin],
	props: {
		label: {
			type: String,
			required: false,
		},
	},
};
</script>

<style lang="scss" scoped>
.base-field {
	&__input {
		width: 100%;
		padding: 8px;
		border: 2px solid $color-grey-light-4;
		border-radius: 4px;
		outline: none;
		transition: 0.2s;

		&:focus {
			border-color: dodgerblue;
		}
	}

	&__label {
		font-size: 1.3rem;
		color: $color-grey-dark-2;
	}

	.is-invalid {
		border: 2px solid rgb(255, 130, 130);
	}
}
</style>
