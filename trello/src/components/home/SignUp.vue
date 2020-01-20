<template>
	<div class="signup">
		<form class="signup__field" @submit.prevent>
			<BaseInput v-model="email" :type="'text'" :placeholder="'Enter email'" />
			<BaseInput
				v-model="username"
				:type="'text'"
				:placeholder="'Enter username'"
			/>
			<BaseInput
				v-model="password"
				:type="'password'"
				:placeholder="'Enter password'"
				@enter="register"
			/>
			<br />
			<div class="error" v-if="this.error">{{ this.error }}</div>
			<BaseBtn @click="register" class="signup__button">Sign Up</BaseBtn>
		</form>
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
	&__button {
		width: 100%;
	}
}

.error {
	color: red;
}
</style>
