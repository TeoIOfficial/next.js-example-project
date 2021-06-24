const path = require('path');

module.exports = {
	reactStrictMode: true,
	images: {
		disableStaticImages: true,
		domains: ['https://reqres.in'],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'src/styles')],
	},
	poweredByHeader: false,
};
