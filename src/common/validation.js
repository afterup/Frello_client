export const checkValidation = (value, rules) => {
	let isValid = true;
	console.log(rules);

	if (!rules) {
		return true;
	}

	if (rules.required) {
		isValid = value !== '' && isValid;
	}
	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid;
	}
	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid;
	}
	if (rules.isEmail) {
		const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		isValid = regex.test(value) && isValid;
	}
	if (rules.isPassword) {
		const regex = /(?=.*\d)(?=.*[a-z]).{6,}/;
		isValid = regex.test(password) && isValid;
	}

	return isValid;
};
