export const isBrowser = typeof window !== 'undefined';

export type Browser = {
	name: string,
	version: string | null
}

export const getBrowser = (userAgent: string): Browser => {

	let browser = '';
	
	const browserVersion = (userAgent: string, regex: RegExp) => (userAgent.match(regex) ? userAgent.match(regex)[2] : null);

	// Detect browser name

	browser = /ucbrowser/i.test(userAgent) ? 'UCBrowser' : browser;
	browser = /edg/i.test(userAgent) ? 'Edge' : browser;
	browser = /googlebot/i.test(userAgent) ? 'GoogleBot' : browser;
	browser = /chromium/i.test(userAgent) ? 'Chromium' : browser;
	browser = /firefox|fxios/i.test(userAgent) && !/seamonkey/i.test(userAgent) ? 'Firefox' : browser;
	browser = /; msie|trident/i.test(userAgent) && !/ucbrowser/i.test(userAgent) ? 'IE' : browser;
	browser = /chrome|crios/i.test(userAgent) && !/opr|opera|chromium|edg|ucbrowser|googlebot/i.test(userAgent) ? 'Chrome' : browser;
	browser = /safari/i.test(userAgent) && !/chromium|edg|ucbrowser|chrome|crios|opr|opera|fxios|firefox/i.test(userAgent) ? 'Safari' : browser;
	browser = /opr|opera/i.test(userAgent) ? 'Opera' : browser;

	// detect browser version and return data object
	
	switch (browser) {
		case 'UCBrowser':
			return {
				name: browser,
				version: browserVersion(userAgent, /(ucbrowser)\/([\d\.]+)/i),
			};
		case 'Edge':
			return {
				name: browser,
				version: browserVersion(userAgent, /(edge|edga|edgios|edg)\/([\d\.]+)/i),
			};
		case 'GoogleBot':
			return {
				name: browser,
				version: browserVersion(userAgent, /(googlebot)\/([\d\.]+)/i),
			};
		case 'Chromium':
			return {
				name: browser,
				version: browserVersion(userAgent, /(chromium)\/([\d\.]+)/i),
			};
		case 'Firefox':
			return {
				name: browser,
				version: browserVersion(userAgent, /(firefox|fxios)\/([\d\.]+)/i),
			};
		case 'Chrome':
			return {
				name: browser,
				version: browserVersion(userAgent, /(chrome|crios)\/([\d\.]+)/i),
			};
		case 'Safari':
			return {
				name: browser,
				version: browserVersion(userAgent, /(safari)\/([\d\.]+)/i),
			};
		case 'Opera':
			return {
				name: browser,
				version: browserVersion(userAgent, /(opera|opr)\/([\d\.]+)/i),
			};
		case 'IE':
			const version = browserVersion(userAgent, /(trident)\/([\d\.]+)/i);
			// IE version is mapped using trident version
			// IE/8.0 = Trident/4.0, IE/9.0 = Trident/5.0
			return {
				name: browser,
				version: (version ? parseFloat(version) + 4.0 : 7.0).toString(),
			};
		default:
			return {
				name: '',
				version: null,
			};
	}
};


