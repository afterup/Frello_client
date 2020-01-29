<template>
	<div class="task">
		<div class="task__item">
			<div class="task__item__title" @click="openCard">
				{{ card.title }}
			</div>
		</div>
	</div>
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
		openCard() {},
	},
};
</script>

<style lang="scss" scoped>
.task {
	&__item {
		display: flex;
		align-items: center;
		background-color: white;
		width: 250px;
		height: 30px;
		margin-bottom: 8px;
		border-radius: 2px;
		box-shadow: 0px 1.3px rgb(182, 182, 182);

		&:hover {
			background-color: rgb(240, 240, 240);
			cursor: pointer;
		}
		&__title {
			margin-left: 8px;
			font-size: 1.4rem;
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
