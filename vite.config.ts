import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		watch: {
			usePolling: true,
		},
	},
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
});
