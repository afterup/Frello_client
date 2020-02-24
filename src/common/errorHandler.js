export const errorHandler = message => {
	switch (message) {
		case 'UNSIGNED_EMAIL':
			throw '등록되지 않은 이메일입니다. 다시 확인해주세요.';

		case 'INCORRECT_PASSWORD':
			throw '비밀번호가 맞지 않습니다. 다시 확인해주세요.';

		case 'DUPLICATE_EMAIL':
			throw '중복된 이메일입니다. 다른 이메일을 사용해주세요.';

		case 'DUPLICATE_USERNAME':
			throw '중복된 사용자 이름입니다. 다른 이름을 사용해주세요.';
	}
};
