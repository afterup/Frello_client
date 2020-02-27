<template>
	<header class="header">
		<div class="header__left">
			<BaseBtn @click="toHome" :icon="true">
				<i slot="badge" class="material-icons">home</i>
			</BaseBtn>
			<BaseBtn v-if="isAuthenticated" @click="toBoards" :badge="true">
				<i class="material-icons" slot="badge">developer_board</i>
				Boards
			</BaseBtn>
		</div>
		<div class="header__center">
			<svg width="90" height="40">
				<image
					href="@/assets/image/frello-logo-white.png"
					class="logo"
					@click="toHome"
				/>
			</svg>
		</div>
		<div class="hedaer__right">
			<NavigationItems
				:isAuthenticated="isAuthenticated"
				:currentUser="currentUser"
			/>
		</div>
	</header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'the-header',
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
	position: fixed;
	height: $header-height;
	width: 100%;
	top: 0;
	left: 0;
	padding: 0 1.5rem;
	z-index: 9999;
	background-color: #0269a7;

	&__left {
		display: flex;
		align-items: center;

		&__home {
			@media screen and (max-width: $bp-smallest) {
				display: none;
			}
		}
	}
}

.logo {
	width: 90px;
	height: 40px;

	&:hover {
		cursor: pointer;
	}
}
</style>
