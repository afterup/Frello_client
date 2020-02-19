<template>
	<div class="validation">
		<ValidationInput 
					v-for="(control,idx) in controls"
					:class="control.valid && control.touched? '':'is-invalid'"
					:key="idx"
					 v-model="control.value" 
					:controlId="idx"
					:label="control.label"
					:elementType="control.elementConfig.type"
					:placeholder="control.elementConfig.placeholder"
					:invalid="control.valid"
					:touched="control.touched"
					@input="inputChangedHandler(control.value, idx)"
					/>
		<button @click="onSubmit">Button</button>
		<div v-if="error"> {{ error }}</div>
	</div>
</template>

<script>
import { checkValidity } from '@/validation/checkValidity';
import ValidationInput from '@/validation/ValidationInput';

export default {
	data() {
		return {
			controls: {
        email: {
          label: '이메일',
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'example@google.com',
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          vaild: false,
          touched: false,
        },
				password: {
          label: '비밀번호',
          elementConfig: {
            type: 'password',
            placeholder: '6자 이상의 비밀번호를 설정하세요.',
          },
          value: '',
          validation: {
            required: true,
						minLength: 6,
          },
          valid: false,
          touched: false,
				},
			},
			error:''
		};
	},
	components: {
		ValidationInput
	},
	methods: {

		inputChangedHandler(value, id) {
			console.log(value, id);
			this.touched = true;
			const validation = checkValidity(value, this.controls[id].validation);
			console.log(validation);
			if(validation){
				this.controls[id].valid = true;
				return;
			}else {
				this.controls[id].valid = false;
			}
		},
		onSubmit() {
			const validation = checkValidity(this.email.value, this.email.validation);
			if(validation){
				return;
			}else {
				this.error = '입력사항을 확인해주세요.';
			}
		},
	},
};
</script>

<style>
 .is-invalid{
	 border: 1px solid red;
 }
</style>
