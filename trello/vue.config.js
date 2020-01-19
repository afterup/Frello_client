// vue.config.js
module.exports = {
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
