const path = require('path');
const {i18n} = require('./next-i18next.config');

module.exports = {
	env: {
		CREATOR: 'TeoIOfficial',
	},
	// webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
	// 	// console.log('buildId', buildId);
	// 	// console.log('dev', dev);
	// 	// console.log('isServer', isServer);
	// 	// console.log('defaultLoaders', defaultLoaders);
	// 	// console.log('webpack', webpack);
	// 	return config;
	// },
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-DNS-Prefetch-Control',
						value: 'on',
					},
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=31536000; includeSubDomains; preload',
					},
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block',
					},
					{
						key: 'X-Frame-Options',
						value: 'SAMEORIGIN',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'origin-when-cross-origin',
					},
					// {
					// 	key: 'Content-Security-Policy',
					// 	value: // Your CSP Policy
					// }
				],
			},
		];
	},
	i18n,
	async rewrites() {
		return [
			{
				source: `/bg/${encodeURIComponent('влез')}`,
				destination: '/login',
				locale: false,
			},
			{
				source: `/bg/${encodeURIComponent('регистрация')}`,
				destination: '/register',
				locale: false,
			},
			{
				source: `/bg/${encodeURIComponent('излез')}`,
				destination: '/logout',
				locale: false,
			},
			{
				source: `/bg/${encodeURIComponent('тема')}`,
				destination: '/theme',
				locale: false,
			},
			{
				source: `/bg/${encodeURIComponent('потребители')}`,
				destination: '/users',
				locale: false,
			},
			{
				source: `/bg/${encodeURIComponent('потребители/:userId')}`,
				destination: '/users?userId=:userId',
				locale: false,
			},
			{
				source: `/bg/${encodeURIComponent('назад')}`,
				destination: '/go-back',
				locale: false,
			},
		];
	},
	reactStrictMode: true,
	images: {
		domains: [],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'src/styles')],
	},
	poweredByHeader: false,
	generateEtags: false,
	distDir: 'build',
};
