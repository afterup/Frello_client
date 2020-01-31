<template>
	<router-link
		:to="`/board/${this.$route.params.id}/card/${card.card_id}`"
		class="task"
		tag="div"
	>
		<div class="task__item" @click="openCard">
			<div class="task__item__title">
				{{ card.title }}
			</div>
		</div>
	</router-link>
</template>

<script>
export default {
	props: {
		card: {
			type: Object,
			required: false,
		},
	},
	methods: {
		openCard() {
			this.$store.commit('OPEN_MODAL');
		},
	},
};
</script>

<style lang="scss" scoped>
.task {
	display: flex;
	justify-content: center;

	&__item {
		border-radius: 2px;
		width: 24rem;
		height: auto;
		padding: 0.5rem 0;
		margin-bottom: 8px;

		background-color: white;
		box-shadow: 0px 1.3px rgb(182, 182, 182);

		&:hover {
			background-color: rgb(240, 240, 240);
			cursor: pointer;
		}
		&__title {
			margin-left: 8px;
			font-size: 1.3rem;
		}
	}

	&__add {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 10px;
		width: 250px;
		height: 30px;
		border-radius: 3px;

		&:hover {
			background-color: rgb(218, 218, 218);
			cursor: pointer;
		}

		&__text {
			color: gray;
			font-size: 1.3rem;
		}
		i {
			color: gray;
			font-size: 18px;
		}
	}
}

.add-list {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	background-color: rgba(187, 187, 187, 0.74);
	border-radius: 2px;
	width: 250px;
	height: 30px;

	i {
		color: gray;
		font-size: 18px;
	}

	&__text {
		color: gray;
		font-size: 1.3rem;
	}
}
</style>
