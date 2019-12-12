/**
 * External dependencies
 */
import { ThemeProvider } from 'styled-components';

export { withTheme as withTheme } from 'styled-components';

const getTheme = ( theme ) => ( {
	fontSizes: {
		small: 12,
		medium: 18,
		big: 22,
	},
	space: {
		small: 4,
		medium: 8,
		large: 16,
		xlarge: 24,
	},
	zIndices: {
		'block-library-gallery-item__inline-menu': 20,
	},
	colors: themes[ theme || '' ] || themes.default,
} );

const themes = {
	default: {
		primary: '#0085ba',
		secondary: '#11a0d2',
		toggle: '#11a0d2',
		button: '#0085ba',
		outlines: '#007cba',
	},
	'admin-color-light': {
		primary: '#0085ba',
		secondary: '#c75726',
		toggle: '#11a0d2',
		button: '#0085ba',
		outlines: '#007cba',
	},
	'admin-color-blue': {
		primary: '#82b4cb',
		secondary: '#d9ab59',
		toggle: '#82b4cb',
		button: '#d9ab59',
		outlines: '#417e9B',
	},
	'admin-color-coffee': {
		primary: '#c2a68c',
		secondary: '#9fa47b',
		toggle: '#c2a68c',
		button: '#c2a68c',
		outlines: '#59524c',
	},
	'admin-color-ectoplasm': {
		primary: '#a7b656',
		secondary: '#c77430',
		toggle: '#a7b656',
		button: '#a7b656',
		outlines: '#523f6d',
	},
	'admin-color-midnight': {
		primary: '#e14d43',
		secondary: '#77a6b9',
		toggle: '#77a6b9',
		button: '#e14d43',
		outlines: '#497b8d',
	},
	'admin-color-ocean': {
		primary: '#a3b9a2',
		secondary: '#a89d8a',
		toggle: '#a3b9a2',
		button: '#a3b9a2',
		outlines: '#5e7d5e',
	},
	'admin-color-sunrise': {
		primary: '#d1864a',
		secondary: '#c8b03c',
		toggle: '#c8b03c',
		button: '#d1864a',
		outlines: '#837425',
	},
};

export default ( { theme, children } ) => (
	<ThemeProvider theme={ getTheme( theme ) }>
		{ children }
	</ThemeProvider>
);