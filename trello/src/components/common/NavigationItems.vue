<template>
	<div class="navigation" v-if="!isAuthenticated">
		<BaseBtn class="navigation__login" @click="showModal = true">Login</BaseBtn>
		<BaseBtn class="navigation__signup" @click="$router.push('signup')"
			>Sign Up</BaseBtn
		>
		<Modal v-if="showModal" @close="showModal = false">
			<h3 slot="header">Login</h3>
			<div slot="body"><Login /></div>
		</Modal>
	</div>
	<div class="user" v-else>
		<div class="user__button" @click="handleUserContent">
			{{ currentUser.username.substring(0, 1).toUpperCase() }}
		</div>
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
				<li>My Page</li>
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
			showModal: false,
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
	},
	methods: {
		logout() {
			this.$store.dispatch('LOGOUT').then(() => {
				this.$router.push({ name: 'home' });
				this.userClick();
			});
		},
		openModal() {
			this.modal = true;
		},
		closeModal() {
			this.modal = false;
		},
		handleUserContent() {
			this.userContent = !this.userContent;
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
	&__button {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 25px;
		background-color: #dfe1e6;
		color: black;
		height: 30px;
		width: 30px;
		font-size: 1.6rem;
		font-weight: bolder;

		&:hover {
			cursor: pointer;
		}
	}

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
