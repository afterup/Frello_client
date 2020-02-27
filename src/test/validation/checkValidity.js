export const checkValidity = (value, rules) => {
	let isValid = true;
	if (!rules) {
		return true;
	}

	if (rules.required) {
		isValid = value !== '' && isValid;
	}

	if (rules.minLength) {
		isValid = value.length > rules.minLength && isValid;
	}

	if (rules.isEmail) {
		const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		return regex.test(value);
	}

	return isValid;
};
