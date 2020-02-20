const path = require('path');

module.exports = {
	outputDir: path.resolve(__dirname, '../api/public'),
	devServer: {
		clientLogLevel: 'info',
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:3000/api',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '',
				},
			},
		},
	},
	css: {
		loaderOptions: {
			scss: {
				prependData: `
                    @import "@/lib/styles/main.scss";
                `,
			},
		},
	},
};
