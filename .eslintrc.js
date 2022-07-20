module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	extends: [
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"eslint:recommended",
		"prettier",
	],
	rules: {
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": ["error"],
		"@typescript-eslint/no-var-requires": ["warn"]
	},
	env: {
		browser: true,
		amd: true,
		node: true,
	},
}
