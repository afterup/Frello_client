<template>
	<header class="header">
		<div class="header__home">
			<BaseBtn class="header__home__button" @click="toHome">
				<i class="material-icons">home</i>
			</BaseBtn>
			<BaseBtn
				class="header__home__button"
				v-if="isAuthenticated"
				@click="toBoards"
				:badge="true"
			>
				<i class="material-icons" slot="badge">developer_board</i>
				Boards
			</BaseBtn>
		</div>
		<svg width="90" height="40">
			<image
				href="@/assets/image/trello-logo-white.svg"
				width="90"
				height="40"
				class="logo"
				@click="toHome"
			/>
		</svg>
		<NavigationItems
			:isAuthenticated="isAuthenticated"
			:currentUser="currentUser"
		/>
	</header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	components: {
		NavigationItems: () => import('@/components/common/NavigationItems.vue'),
	},
	computed: {
		...mapGetters(['isAuthenticated', 'currentUser']),
	},
	methods: {
		toHome() {
			this.$router.push({ name: 'home' });
		},
		toBoards() {
			this.$router.push({
				name: 'boards',
				params: { username: this.currentUser.username },
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-between;
	justify-items: center;
	align-items: center;
	background-color: #0269a7;
	height: 4rem;
	padding: 0 1.5rem;

	&__home {
		display: flex;
		align-items: center;
	}
}

.logo:hover {
	cursor: pointer;
}
</style>
