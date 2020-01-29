<template>
	<div class="field">
		<div class="control" v-if="toggle">
			<input
				v-if="toggleText"
				class="control__input"
				:type="type"
				:placeholder="value ? placeholder : value"
				:value="value"
				@input="updateValue($event.target.value)"
				@keyup.enter="enterToggle"
			/>
			<h3 v-else @click="handletoggleText" class="control__text">
				{{ value }}
			</h3>
		</div>
		<div class="control" v-else-if="create">
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
				<i class="material-icons">add</i>
				{{ placeholder }}
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
		create: {
			type: Boolean,
			required: false,
		},
	},
	methods: {
		updateValue(value) {
			this.$emit('input', value);
		},
		enterToggle(value) {
			this.toggleText = false;
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

	&__text {
		display: flex;
		align-items: center;
		font-size: 1.3rem;
	}
}
</style>
