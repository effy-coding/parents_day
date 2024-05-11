/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['GowunDodum', 'ui-sans-serif', 'system-ui']
		},
		extend: {
			colors: {
				primary: {
					500: '#ebd9a2',
					400: '#e1a36f'
				}
			}
		}
	},
	plugins: []
};
