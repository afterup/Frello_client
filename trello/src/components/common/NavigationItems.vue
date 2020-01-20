<template>
	<div class="navigation" v-if="!isAuthenticated">
		<BaseBtn class="navigation__login" @click="handleLoginModal">Login</BaseBtn>
		<Modal v-if="showLoginModal" @close="handleLoginModal">
			<h3 slot="header">Log in to Trello</h3>
			<div slot="body"><Login /></div>
		</Modal>

		<BaseBtn class="navigation__signup" @click="handleSignupModal"
			>Sign Up</BaseBtn
		>
		<Modal v-if="showSignupModal" @close="handleSignupModal">
			<h3 slot="header">Sign up to trello</h3>
			<div slot="body"><SignUp /></div>
		</Modal>
	</div>
	<div class="user" v-else>
		<BaseIcon
			:username="currentUser.username"
			@click="handleUserContent"
			:size="30"
		/>
		<div class="user__content" v-if="userContent">
			<ul>
				<li>
					<span>
						{{ currentUser.username }}
					</span>
					<span @click="handleUserContent">
						<i class="material-icons close">close</i>
					</span>
				</li>
				<hr />
				<li
					@click="
						$router.push({
							name: 'mypage',
							params: { username: currentUser.username },
						})
					"
				>
					My Page
				</li>
				<li>Setting</li>
				<li @click="logout">Log Out</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showLoginModal: false,
			showSignupModal: false,
			userContent: false,
		};
	},
	props: {
		isAuthenticated: {
			type: Boolean,
			required: true,
		},
		currentUser: {
			type: Object,
			required: false,
		},
	},
	components: {
		Login: () => import('@/components/home/Login.vue'),
		SignUp: () => import('@/components/home/SignUp.vue'),
	},
	methods: {
		logout() {
			this.$store.dispatch('LOGOUT').then(() => {
				this.$router.push({ name: 'home' });
				this.handleUserContent();
			});
		},
		handleUserContent() {
			this.userContent = !this.userContent;
		},
		handleLoginModal() {
			this.showLoginModal = !this.showLoginModal;
		},
		handleSignupModal() {
			this.showSignupModal = !this.showSignupModal;
		},
	},
};
</script>

<style lang="scss" scoped>
.navigation {
	display: flex;
	justify-content: space-between;
	align-items: center;

	&__login {
		text-decoration-line: none;
		list-style: none;
		background-color: transparent;

		&:hover {
			text-decoration-line: underline;
		}

		&:visted {
			color: white;
		}
	}

	&__signup {
		text-decoration-line: none;
		background-color: white;
		color: $color-primary;
	}
}

.user {
	&__content {
		position: absolute;
		top: 45px;
		right: 10px;
		width: 180px;
		height: 120px;
		background-color: #fff;

		ul {
			list-style: none;
			padding: 0.4rem;
			li {
				display: flex;
				align-items: center;
				font-size: 1.3rem;
				padding: 0.2rem;

				&:hover {
					background-color: rgb(235, 235, 235);
					cursor: pointer;
				}

				&:first-child {
					span:first-child {
						margin-right: 4rem;
						margin-left: 6.5rem;
					}

					&:hover {
						background-color: #fff;
						cursor: default;
					}
				}
			}
		}
		.close {
			font-size: 20px;
			color: grey;

			&:hover {
				cursor: pointer;
			}
		}
	}
}
</style>
