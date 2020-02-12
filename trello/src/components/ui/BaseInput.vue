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
		<div v-if="toggleText">
			<input
				class="toggle-field__input"
				v-if="type === 'text'"
				autofocus
				type="text"
				:placeholder="placeholder"
				:value="value"
				@input="updateValue($event.target.value)"
				@keyup.enter="enterToggle"
			/>
			<textarea
				v-else
				cols="30"
				rows="10"
				:value="value"
				@input="updateValue($event.target.value)"
				@keyup.enter="enterToggle"
			></textarea>
		</div>
	</div>
	<div class="base-field" v-else>
		<input
			class="base-field__input"
			:class="{ 'is-invalid': !isValid }"
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
		maxlength: {
			type: Number,
			required: false,
		},
	},
	methods: {
		updateValue(value) {
			this.isValid = true;
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

		// animation-duration: 0.7s;
		// animation-name: slidein;

		// @keyframes slidein {
		// 	from {
		// 		height: 4rem;
		// 	}

		// 	to {
		// 		height: 8rem;
		// 	}
		// }

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

	.is-invalid {
		border: 2px solid rgb(255, 130, 130);
	}
}
</style>
