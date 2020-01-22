<template>
	<div class="navigation" v-if="!isAuthenticated">
		<router-link :to="'login'" tag="div">
			<BaseBtn class="navigation__login" @click="openModal">Login</BaseBtn>
		</router-link>
		<router-link :to="'signup'" tag="div">
			<BaseBtn class="navigation__signup" @click="openModal">Sign Up</BaseBtn>
		</router-link>
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
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
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
	computed: {
		...mapGetters(['showModal']),
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
		openModal() {
			this.$store.commit('OPEN_MODAL');
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
		z-index: 2;
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
