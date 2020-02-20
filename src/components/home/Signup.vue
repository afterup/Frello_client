<template>
	<div class="signup">
		<h3 class="signup__title">Sign up to Trello</h3>
		<form class="signup__field" @submit.prevent>
			<BaseInput
				v-model.trim="email"
				:type="'text'"
				:label="'Email'"
				:placeholder="'Enter email'"
				:maxlength="50"
				@keypress.enter.prevent
			/>
			<BaseInput
				v-model.trim="username"
				:type="'text'"
				:label="'Username'"
				:placeholder="'Enter username'"
				:maxlength="30"
				@keypress.enter.prevent
			/>
			<BaseInput
				v-model.trim="password"
				:type="'password'"
				:label="'Password'"
				:placeholder="'Enter password'"
				:maxlength="20"
				@keypress.enter.prevent
			/>
			<br />
			<BaseBtn @click="register" class="signup__button">Sign Up</BaseBtn>
		</form>
	</div>
</template>

<script>
export default {
	name: 'signup',
	data() {
		return {
			email: '',
			username: '',
			password: '',
		};
	},
	methods: {
		register() {
			this.$store
				.dispatch('signup', {
					email: this.email,
					username: this.username,
					password: this.password,
				})
				.then(() => {
					alert('가입되었습니다.');
					this.$store.commit('CLOSE_MODAL');
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
	&__title {
		text-align: center;
		font-size: 1.5rem;
		margin: 4rem;
		color: $color-grey-dark-1;
	}

	&__button {
		width: 100%;
		margin-bottom: 3rem;
	}
}

.error {
	color: red;
}
</style>
