<template>
	<div class="login">
		<label for="email">Email</label>
		<input type="text" id="email" v-model="email" />
		<label for="password">Password</label>
		<input type="text" id="password" v-model="password" />
		<button @click="login()">Login</button>
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
		login() {
			this.$store
				.dispatch('login', {
					email: this.email,
					password: this.password,
				})
				.then(user => {
					console.log(user);
					this.$router.push({
						name: 'board',
						params: { username: user.username },
					});
				});
		},
	},
};
</script>

<style lang="scss" scoped></style>
