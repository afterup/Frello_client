<template>
	<div v-if="!isAuthenticated">
		<ul class="header__navigation">
			<router-link class="header__navigation__login" :to="{ name: 'login' }"
				>Log In</router-link
			>
			<router-link class="header__navigation__signup" :to="{ name: 'signup' }"
				>Sign Up</router-link
			>
		</ul>
	</div>
	<div v-else>
		<button @click="logout()">Logout</button>
		<div class="header__user">
			<div class="header__user__button">A</div>
			<div class="header__user__content">
				<div class="header__user__content__username">User(id)</div>
				<hr />
				<ul>
					<li>Setting</li>
					<li>Logout</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['isAuthenticated']),
	},
	methods: {
		logout() {
			this.$store.dispatch('LOGOUT').then(() => {
				this.$router.push({ name: 'home' });
			});
		},
		openModal() {
			this.modal = true;
		},
		closeModal() {
			this.modal = false;
		},
	},
};
</script>

<style lang="scss">
.header__navigation {
	display: flex;
	justify-content: space-between;
	align-items: center;

	&__login {
		text-decoration-line: none;
		margin-right: 20px;
		color: white;

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
		font-size: 1.5rem;
		font-weight: bold;
		padding: 4px;
		border-radius: 3px;
	}
}
</style>
