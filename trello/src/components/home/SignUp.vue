<template>
	<div class="signup">
		<h2>Sign Up</h2>
		<label for="email">Email</label>
		<input type="text" id="email" v-model="email" />
		<label for="username">Username</label>
		<input type="text" id="username" v-model="username" />
		<label for="password">Password</label>
		<input type="password" id="password" v-model="password" />
		<br />
		<div class="error" v-if="this.error">{{ this.error }}</div>
		<button @click="register">SignIn</button>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			email: '',
			username: '',
			password: '',
		};
	},
	computed: {
		...mapGetters(['error']),
	},
	methods: {
		register() {
			this.$store
				.dispatch('signup', {
					email: this.email,
					username: this.username,
					password: this.password,
				})
				.then(result => {
					console.log(result);
					alert('가입되었습니다.');
					this.$router.push({ name: 'home' });
				})
				.catch(error => {
					console.log(error);
				});
		},
	},
};
</script>

<style lang="scss">
.signup {
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	width: 400px;
}

.error {
	color: red;
}
</style>
