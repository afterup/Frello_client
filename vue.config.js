const path = require('path');

module.exports = {
	outputDir: path.resolve(__dirname, '../project_api_trello/src/public'),
	devServer: {
		clientLogLevel: 'info',
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
