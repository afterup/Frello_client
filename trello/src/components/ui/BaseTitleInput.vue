<template>
	<div class="search">
		<div v-if="type === 'update'">
			<input
				type="text"
				class="list__update-input"
				:value="title"
				v-if="showInput"
				@keyup.enter="action"
			/>
			<div class="list__title" v-else @click="handleInput">
				{{ title }}
			</div>
			<slot name="button"></slot>
		</div>
		<div v-else></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showInput: false,
		};
	},
	props: {
		title: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: false,
		},
	},
	methods: {
		handleInput() {
			this.showInput = !this.showInput;
		},
		action($event) {
			this.$emit('update:newTitle', $event.target.value);
			this.$emit('action');
			this.handleInput();
		},
	},
};
</script>

<style lang="scss" scoped>
.search {
	&__input {
		border: none;
		border-radius: 3px;
		width: 180px;
		height: 30px;
		background-color: #6ea5ca;
	}
}

.list__title {
	font-size: 1.4rem;
	font-weight: bold;
	margin-bottom: 10px;
}
</style>
