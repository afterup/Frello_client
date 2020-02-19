<template>
	<div class="login">
		<h3 class="login__title">Log in to Trello</h3>
		<form class="login__form" @submit.prevent>
			<BaseInput
				v-model.trim="email"
				:type="'text'"
				:label="'Email'"
				:placeholder="'Enter email'"
				:maxlength="30"
				@enter="nextInput"
			/>
			<BaseInput
				v-model.trim="password"
				:type="'password'"
				:label="'Password'"
				:placeholder="'Enter password'"
				:maxlength="20"
				@enter="login"
			/>
			<br />
			<!-- <div v-if="error" class="error">{{ error }}</div> -->
			<BaseBtn class="login__button" :width="'100%'">Login</BaseBtn>
		</form>
	</div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			email: '',
			password: '',
		};
	},
	methods: {
		async login() {
			const user = await this.$store.dispatch('login', {
				email: this.email,
				password: this.password,
			});

			if (user.error) {
				return;
			}

			this.$store.commit('CLOSE_MODAL');
			this.$router.push({
				name: 'boards',
				params: { username: user.username },
			});
		},
		nextInput() {
			console.log(this);
		},
	},
};
</script>

<style lang="scss" scoped>
.login {
	&__form {
		margin: 3rem 0;
	}

	&__title {
		text-align: center;
		font-size: 1.5rem;
		margin-top: 4rem;
		color: $color-grey-dark-1;
	}

	&__button {
		background-color: $color-green-dark;
		width: 100%;

		&:hover {
			background-color: $color-green-light;
		}
	}
}

.error {
	color: red;
	margin-bottom: 0.8rem;
	transition: all 0.3s;
}
</style>
