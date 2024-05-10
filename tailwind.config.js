/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					600: '#b56e4f',
					500: '#edc5b5',
					400: '#ebd9a2'
				}
			}
		}
	},
	plugins: []
};
