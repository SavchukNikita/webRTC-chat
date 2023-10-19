import vue from '@vitejs/plugin-vue';
import path from 'path';
import {defineConfig} from 'vite';
import commonjs from 'vite-plugin-commonjs';
import env from 'vite-plugin-env-compatible';

export default defineConfig(() => {
	return {
		css: {
			modules: {
				localsConvention:   'camelCase',
				generateScopedName: '[local]__[hash:base64:4]',
			},
		},
		plugins: [
			vue(),
			env(),
			commonjs(),
		],
		ssr:     {
			format: 'cjs',
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
		build:   {
			target: 'es2015',
		},
	};
});
