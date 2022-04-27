import { defineConfig } from 'vite';

export default defineConfig({
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
		// preprocessorOptions: {
		// 	less: {
		// 		// javascriptEnabled: true,
		// 		modifyVars: {
		// 			'brand-color': '#c51d63', // PS
		// 			// 'brand-color': '#d32027', // SR
		// 		},
		// 	},
		// },
	},
});
