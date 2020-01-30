<template>
	<div class="field">
		<div class="control" v-if="toggle">
			<input
				v-if="toggleText"
				class="control__input"
				:type="type"
				:placeholder="placeholder"
				:value="value"
				@input="updateValue($event.target.value)"
				@keyup.enter="enterToggle"
			/>
			<h3 v-else @click="handletoggleText" class="control__text">
				<div class="control__text__slot">
					<slot name="badge"></slot>
					<slot></slot>
				</div>
			</h3>
		</div>
		<div class="control" v-else>
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
		toggle: {
			type: Boolean,
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

	input[type='textarea'] {
		height: 5rem;
	}

	&__text {
		font-size: 1.3rem;

		&__slot {
			display: flex;
			align-items: center;
		}
	}
}
</style>
