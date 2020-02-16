<template>
	<div class="toggle-field">
		<div v-if="type === 'text'" class="toggle-field__input">
			<input
				type="text"
				:placeholder="placeholder"
				:value="value"
				@input="updateValue($event.target.value)"
				@keyup.enter="enterToggle"
			/>
		</div>
		<div v-if="type === 'textarea'" class="toggle-field__textarea">
			<div
				v-if="!isEditing"
				class="toggle-field__textarea__slot"
				@click="handleTextareaToggle"
			>
				<slot name="badge"></slot>
				<slot></slot>
			</div>
			<div v-else>
				<textarea
					:placeholder="placeholder"
					:value="value"
					@input="updateValue($event.target.value)"
					@keyup.enter="enterToggle"
				></textarea>
				<div class="toggle-field__textarea__button">
					<BaseBtn class="submit" @click="clickAddButton">Add</BaseBtn>
					<BaseBtn class="close" @click="handleTextareaToggle">Close</BaseBtn>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import inputMixin from '@/mixins/inputMixin';

export default {
	data() {
		return {
			isEditing: false,
		};
	},
	mixins: [inputMixin],
	methods: {
		enterToggle(e) {
			e.target.blur();
			this.$emit('enter');
		},
		handleTextareaToggle() {
			this.isEditing = !this.isEditing;
		},
		clickAddButton() {
			this.isEditing = false;
			this.$emit('enter');
		},
	},
};
</script>

<style lang="scss" scoped>
.toggle-field {
	&__input {
		display: flex;
		align-items: center;
		min-width: 3rem;
		font-weight: bolder;

		input[type='text'] {
			height: auto;
			outline: none;
			border: none;
			border-radius: 4px;
			font-size: 17px;
			background-color: rgba(0, 0, 0, 0);
			word-wrap: break-word;
			word-break: keep-all;

			&:hover {
				background-color: #c1c4c95b;
				border-radius: 4px;
				cursor: pointer;
			}
			&:focus {
				background-color: white;
			}
		}
	}

	&__textarea {
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

		&__slot {
			display: flex;
			align-items: center;
		}

		&__button {
			display: flex;

			.submit {
				background-color: $color-green-light;
			}

			.close {
				background-color: $color-grey-dark-3;
			}
		}
	}
}
</style>
