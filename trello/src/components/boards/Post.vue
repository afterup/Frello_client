<template>
	<div class="board-post">
		<label for="title">title</label>
		<input type="text" id="title" v-model="title" />
		<br />
		<div class="error" v-if="this.error">{{ this.error }}</div>
		<div class="colors">
			<div
				class="color"
				:class="color"
				v-for="(color, i) in colors"
				:key="i"
				@click="chooseBackground(color)"
			></div>
		</div>

		<button @click="onSubmit">Create</button>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			title: '',
			background: 'blue',
			colors: ['blue', 'red', 'orange', 'yellow', 'green', 'purple'],
		};
	},
	computed: {
		...mapGetters(['error']),
	},
	methods: {
		onSubmit() {
			this.$store
				.dispatch('PUBLISH_BOARD', {
					title: this.title,
					background: this.background,
				})
				.then(data => {
					this.$store.dispatch('FETCH_BOARDS', this.$route.params.username);
					this.$emit('close');
				});
		},
		chooseBackground(color) {
			this.color = color;
		},
	},
};
</script>

<style lang="scss" scoped>
.colors {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.color {
	width: 25px;
	height: 25px;
	margin-right: 5px;
}

.blue {
	background-color: $background-blue;
}
.red {
	background-color: $background-red;
}
.orange {
	background-color: $background-orange;
}
.yellow {
	background-color: $background-yellow;
}
.green {
	background-color: $background-green;
}
.purple {
	background-color: $background-purple;
}
</style>
