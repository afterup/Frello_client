// .eslintrc.js
module.exports = {
	root: true,
	extends: ['plugin:vue/essential', 'prettier'],
	plugins: ['prettier'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
};
