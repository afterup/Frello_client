// .eslintrc.js
module.exports = {
  root: true,
  extends: [
    'plugin:vue/essential',
    'prettier',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: true,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ],
    'no-console': 'off',
  },
  parserOptions: {
    parser: "babel-eslint"
  },
};