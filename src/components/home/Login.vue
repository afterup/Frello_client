<template>
	<div class="login">
		<h3 class="login__title">Log in to Trello</h3>
		<form class="login__form" @submit.prevent="onSubmit">
			<BaseInput
				v-model.trim="email"
				:type="'text'"
				:label="'Email'"
				:placeholder="'Enter email'"
				:maxlength="30"
				:checkSubmitAndError="submitted && $v.email.$error"
			/>
			<div v-if="submitted && $v.email.$error" class="error">
				<span v-if="!$v.email.email">이메일 형식으로 작성 해 주세요.</span>
				<span v-if="!$v.email.required">이메일을 작성 해 주세요.</span>
			</div>
			<BaseInput
				v-model.trim="password"
				:type="'password'"
				:label="'Password'"
				:placeholder="'Enter password'"
				:maxlength="20"
				:checkSubmitAndError="submitted && $v.password.$error"
			/>
			<span v-if="submitted && !$v.password.required" class="error"
				>비밀번호를 작성 해 주세요.</span
			>
			<br />

			<div v-if="error" class="error">{{ error }}</div>
			<BaseBtn class="login__button" type="submit" :width="'100%'"
				>Login</BaseBtn
			>
		</form>
	</div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
	name: 'login',
	data() {
		return {
			email: '',
			password: '',
			submitted: false,
			error: '',
		};
	},
	validations: {
		email: { required, email },
		password: {
			required,
		},
	},
	methods: {
		onSubmit() {
			this.submitted = true;
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			const formData = { email: this.email, password: this.password };
			this.$store
				.dispatch('LOGIN', formData)
				.then(user => {
					console.log(user);
					this.$store.commit('CLOSE_MODAL');
					this.$router.push({
						name: 'boards',
						params: { username: user.username },
					});
				})
				.catch(error => {
					this.error = error;
					return;
				});
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
			cursor: pointer;
		}
	}
}

.error {
	font-size: 1.1rem;
	margin-bottom: 0.8rem;
	color: rgb(255, 41, 41);
	transition: all 0.3s;
}
</style>
