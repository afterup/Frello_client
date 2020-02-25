const path = require('path');

module.exports = {
	outputDir: path.resolve(__dirname, '../api/public'),
	publicPath: '/',
	chainWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			config.plugin('html').tap(args => {
				args[0].minify.removeAttributeQuotes = false;
				return args;
			});
		}
	},
	devServer: {
		clientLogLevel: 'info',
		port: 8080,
		proxy: {
			'/api': {
				target: 'http://localhost:3000/api',
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
