<template>
	<div class="signup">
		<h3 class="signup__title">Sign up to Trello</h3>
		<form class="signup__field" @submit.prevent="onSubmit">
			<BaseInput
				v-model.trim="email"
				:type="'text'"
				:label="'Email'"
				:placeholder="'Enter email'"
				:maxlength="50"
				:checkSubmitAndError="submitted && $v.email.$error"
				@keypress.enter.prevent
			/>
			<div v-if="submitted && $v.email.$error" class="error">
				<span v-if="!$v.email.email">이메일 형식으로 작성 해 주세요.</span>
				<span v-if="!$v.email.required">이메일을 작성 해 주세요.</span>
			</div>
			<BaseInput
				v-model.trim="username"
				:type="'text'"
				:label="'Username'"
				:placeholder="'Enter username'"
				:maxlength="30"
				:checkSubmitAndError="submitted && $v.username.$error"
				@keypress.enter.prevent
			/>
			<div v-if="submitted && $v.username.$error" class="error">
				<span v-if="!$v.username.required">사용자 이름을 작성 해 주세요.</span>
				<span v-if="!$v.username.minLength"
					>사용자 이름을 3글자 이상 작성해주세요.</span
				>
			</div>
			<BaseInput
				v-model.trim="password"
				:type="'password'"
				:label="'Password'"
				:placeholder="'Enter password'"
				:maxlength="20"
				:checkSubmitAndError="submitted && $v.password.$error"
				@keypress.enter.prevent
			/>
			<div v-if="submitted && $v.password.$error" class="error">
				<span v-if="!$v.password.required">비밀번호를 작성 해 주세요.</span>
				<span v-if="$v.password.required && !$v.password.regex"
					>숫자와 문자 포함 6자리 이상, 20자리 이하로 작성 해 주세요</span
				>
			</div>
			<br />
			<div v-if="error" class="error">{{ error }}</div>
			<BaseBtn class="signup__button" type="submit">Sign Up</BaseBtn>
		</form>
	</div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
	name: 'signup',
	data() {
		return {
			email: '',
			username: '',
			password: '',
			error: '',
			submitted: false,
		};
	},
	validations: {
		email: { required, email },
		username: { required, minLength: minLength(3) },
		password: {
			required,
			regex: value => {
				console.log(/(?=.*\d)(?=.*[a-z]).{6,}/.test(value));
				return /(?=.*\d)(?=.*[a-z]).{6,}/.test(value);
			},
		},
	},
	methods: {
		onSubmit() {
			this.submitted = true;
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}

			const formData = {
				email: this.email,
				username: this.username,
				password: this.password,
			};
			this.$store
				.dispatch('signup', formData)
				.then(() => {
					alert('가입되었습니다.');
					this.$store.commit('CLOSE_MODAL');
					this.$router.push({ name: 'home' });
				})
				.catch(error => {
					this.error = error;
					return;
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
	font-size: 1.1rem;
	margin-bottom: 0.8rem;
	color: rgb(255, 41, 41);
	transition: all 0.3s;
}
</style>
