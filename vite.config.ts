import { defineConfig } from 'vite';

export default defineConfig({
	root: './playground',
	esbuild: {
		jsxInject: 'import React from \'react\'',
	},
	build: {
		target: 'esnext',
		rollupOptions: {
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
});
