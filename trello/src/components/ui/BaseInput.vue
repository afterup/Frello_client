<template>
	<div class="control">
		<input
			class="control__input"
			ref="input"
			:type="type"
			:placeholder="placeholder"
			:value="value"
			:autocomplete="type === 'password'"
			@input="updateValue($event.target.value)"
			@keyup.enter="$emit('enter')"
		/>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			required: true,
		},
		placeholder: {
			type: String,
			required: false,
		},
		type: {
			type: String,
			required: true,
		},
	},
	methods: {
		updateValue(value) {
			this.$emit('input', value);
		},
	},
};
</script>

<style lang="scss" scoped>
.control {
	input {
		width: 100%;
		border: 2px solid $color-grey-light-4;
		border-radius: 4px;
		margin: 8px 0;
		padding: 8px;
		outline: none;
		box-sizing: border-box;
		transition: 0.2s;

		&:focus {
			border-color: dodgerblue;
		}
	}
}
</style>
