<template>
	<div class="boards">
		<h3 class="boards__title">
			<slot name="title"></slot>
		</h3>
		<div class="boards__cards">
			<slot name="card"></slot>
			<div class="boards__cards__add" v-if="type === 'personal'" @click="openModal">
				Create new board
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			required: false,
		},
	},
	methods: {
		openModal() {
			this.$store.commit('OPEN_MODAL');
		},
	},
};
</script>

<style lang="scss" scoped>
.boards {
	width: 80%;
	height: 80%;
	margin: 3rem 20rem auto;

	&__title {
		font-size: 1.6rem;
		font-weight: bold;
		margin-bottom: 10px;
	}

	&__cards {
		display: flex;
		flex-wrap: wrap;
	}

	&__cards__add {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 3px;
		background-color: #f0f2f5;
		width: 190px;
		height: 95px;
		margin: 4.5px 9px;
		font-size: 1.6rem;
	}

	&__cards__add:hover {
		cursor: pointer;
		background-color: #e6e8eb;
	}
}
</style>
