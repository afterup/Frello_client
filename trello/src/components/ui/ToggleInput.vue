<template>
	<div class="toggle-field">
		<div
			class="toggle-field__text"
			v-if="!toggleText"
			@click="handletoggleText"
		>
			<slot name="badge"></slot>
			<slot></slot>
		</div>
		<div class="toggle-field__input" v-else>
			<input
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
				:placeholder="placeholder"
				:value="value"
				@input="updateValue($event.target.value)"
				@keyup.enter="enterToggle"
			></textarea>
		</div>
	</div>
</template>

<script>
import inputMixin from '@/mixins/inputMixin';

export default {
	data() {
		return {
			toggleText: false,
		};
	},
	computed: {
		// textSize() {
		// 	const textField = document.getElementsByClassName(
		// 		'toggle-field__text',
		// 	)[0];
		// 	const textFieldWidth = textField.getBoundingClientRect().width;
		// 	console.log(textFieldWidth);
		// 	return {
		// 		'--textSize': textFieldWidth + 1 + 'px',
		// 	};
		// },
	},
	mixins: [inputMixin],
	methods: {
		handletoggleText() {
			this.toggleText = !this.toggleText;
		},
		enterToggle(value) {
			this.handletoggleText();
			this.$emit('enter');
		},
	},
};
</script>

<style lang="scss" scoped>
.toggle-field {
	width: 100%;
	min-width: 3rem;

	&__text {
		display: flex;
		align-items: center;
		padding-left: 0.4rem;
		height: 2.8rem;

		border-radius: 2px;
		font-weight: bolder;

		&:hover {
			background-color: #c1c4c95b;
			cursor: pointer;
		}
	}
	&__input {
		input {
			width: var(--textSize);
			height: 2.8rem;
			padding: 3px;

			outline: none;
			border: 2px solid $color-grey-light-4;
			border-radius: 4px;
			// font-size: 2rem;

			&:focus {
				border-color: dodgerblue;
			}
		}

		textarea {
			width: 24rem;
			height: auto;
			min-height: 6rem;
			padding: 0.5rem 1rem;
			margin-bottom: 8px;

			border-radius: 2px;
			border: none;
			box-shadow: 0px 1.3px rgb(182, 182, 182);
			background-color: white;
			resize: none;
		}

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
	}
}
</style>
