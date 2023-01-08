import { defineConfig } from 'vite';

export default defineConfig(function (env) {
	if (env.command === 'build') {
		return {
			build: {
				rollupOptions: {
					input: './src/styles/renum.less',
					output: {
						dir: './es/styles/',
						assetFileNames: 'renum.css',
					},
				},
			},
			css: {
				postcss: {
					from: './src/styles/renum.less',
					to: './es/styles/renum.css',
				},
				preprocessorOptions: {
					less: {
						javascriptEnabled: true,
					},
				},
			},
		};
	}

	return {
		esbuild: {
			jsxInject: 'import React from \'react\'',
		},
		build: {
			target: 'esnext',
			rollupOptions: {
				input: './src/index.tsx',
				output: {
					sourcemap: true,
					compact: true,
					manualChunks: {
						'react': ['react'],
						'react-dom': ['react-dom'],
					},
				},
			},
		},
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
				},
			},
		},
	};
});
