const path = require('path');

module.exports = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'bg'],
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
		// debug: process.env.NODE_ENV !== 'production',
		fallbackLng: 'en',
		preload: true,
		cleanCode: true,
	},
};
