/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{html,js}'],
	darkMode: 'class',
	theme: {
		extend: {
			animation: {
				pulse: 'pulse 1s linear backwards',
			},
		},
		fontFamily: {
			sans: ['Raleway', 'sans-serif'],
			serif: ['Raleway', 'serif'],
		},
	},
	plugins: [],
}
