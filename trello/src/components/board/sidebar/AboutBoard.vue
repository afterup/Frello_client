<template>
	<div class="about">
		<div class="about__title">
			<i class="material-icons">person_outline</i> Made By
		</div>
		<div class="about__made">
			<BaseIcon :username="board.username" :size="50" />
			<div class="about__made__name">@{{ board.username }}</div>
		</div>
		<div class="about__title">
			<i class="material-icons">access_time</i> Created At
		</div>
		<div class="about__create">
			{{ board.createdAt }}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		board: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.about {
	margin: 0 1rem;
	font-size: 1.2rem;

	i {
		margin-right: 1rem;
	}

	&__title {
		display: flex;
		align-items: center;
		font-size: 1.3rem;
		font-weight: bold;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	&__made {
		display: flex;
		align-items: center;

		&__name {
			margin-left: 1rem;
		}
	}

	&__create {
		display: flex;
	}
}
</style>
