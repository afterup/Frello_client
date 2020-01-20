<template>
	<div class="login">
		<form class="login__field" @submit.prevent>
			<BaseInput v-model="email" :type="'text'" :placeholder="'Enter email'" />
			<BaseInput
				v-model="password"
				:type="'password'"
				:placeholder="'Enter password'"
				@enter="login"
			/>
			<BaseBtn class="login__button" @click="login" :width="'100%'"
				>Login</BaseBtn
			>
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
			this.$router.push({
				name: 'boards',
				params: { username: user.username },
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.login {
	&__field {
		margin: 3rem 0;
	}

	&__button {
		background-color: $color-green-dark;
		width: 100%;

		&:hover {
			background-color: $color-green-light;
		}
	}
}
</style>
