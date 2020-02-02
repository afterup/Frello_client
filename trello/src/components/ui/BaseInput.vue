<template>
	<div class="toggle-field" v-if="kind === 'toggle'">
		<div
			class="toggle-field__text"
			v-if="!toggleText"
			@click="handletoggleText"
		>
			<slot name="badge"></slot>
			<slot></slot>
		</div>
		<input
			v-if="toggleText"
			class="toggle-field__input"
			autofocus
			:type="type"
			:placeholder="placeholder"
			:value="value"
			@input="updateValue($event.target.value)"
			@keyup.enter="enterToggle"
		/>
	</div>
	<div class="base-field" v-else>
		<input
			class="base-field__input"
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
	data() {
		return {
			toggleText: false,
		};
	},
	props: {
		value: {
			type: String,
			required: false,
		},
		placeholder: {
			type: String,
			required: false,
		},
		type: {
			type: String,
			required: true,
		},
		kind: {
			type: String,
			required: false,
		},
	},
	methods: {
		updateValue(value) {
			this.$emit('input', value);
		},
		enterToggle(value) {
			this.handletoggleText();
			this.$emit('enter');
		},
		handletoggleText() {
			this.toggleText = !this.toggleText;
		},
	},
};
</script>

<style lang="scss" scoped>
.toggle-field {
	margin-left: 0.3rem;
	margin-top: 0.3rem;
	width: 100%;

	&__text {
		display: flex;
		align-items: center;
		height: 4rem;

		font-size: 1.2rem;
		font-weight: bold;
		background-color: #ebecf05b;
		border-radius: 2px;

		&:hover {
			cursor: pointer;
			background-color: #c1c4c95b;
		}
	}
	input {
		width: 100%;
		height: 4rem;
		padding: 8px;
		outline: none;
		border: 2px solid $color-grey-light-4;
		border-radius: 4px;
		transition: 0.2s;

		&:focus {
			border-color: dodgerblue;
		}

		&[type='textarea'] {
			height: 8rem;
		}
	}
}

.base-field {
	width: 100%;
	input {
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

// .control {

// 	input[type='textarea'] {
// 		height: 5rem;
// 	}

// 	&__text {
// 		font-size: 1.3rem;

// 		&__slot {
// 			display: flex;
// 			align-items: center;
// 		}
// 	}
// }
</style>
