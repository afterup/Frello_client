<template>
	<div class="board-post">
		<label for="title">title</label>
		<input type="text" id="title" v-model="title" />
		<br />
		<div class="error" v-if="this.error">{{ this.error }}</div>
		<button @click="onSubmit">Create</button>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			title: '',
		};
	},
	computed: {
		...mapGetters(['error']),
	},
	methods: {
		onSubmit() {
			this.$store.dispatch('PUBLISH_BOARD', { title: this.title });
		},
	},
};
</script>

<style></style>
