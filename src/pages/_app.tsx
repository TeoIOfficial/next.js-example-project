import App, { AppProps, AppContext } from 'next/app';
import { connect, batch } from "react-redux";
import cookie from "js-cookie";
import cookies from 'next-cookies';
import { getUserById } from 'store/slices/userSlice';
import { setTheme, setBrowser, setIsMobile } from "store/slices/utilsSlice";
import { wrapper } from "store";
import { isBrowser, getBrowser } from 'utils/helpers';
import { appWithTranslation } from 'next-i18next';
import "styles/globals.scss";

class MyApp extends App<AppProps> {

	static getInitialProps = wrapper.getInitialAppProps(store => async ({Component, ctx}: AppContext ) => {	

		// console.log(process.env.ENV_VAR_MAIN);
		// console.log(process.env.ENV_VAR);
		// console.log(process.env.NEXT_PUBLIC_ENV_VAR);
		
		let token = isBrowser ? cookie.get('token') : cookies(ctx)?.token;

		if (token) await store.dispatch(getUserById(token));
		
        return {
            pageProps: {
                ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {})
            },
        };

	});

	componentDidMount() {
		
		let { dispatch } = this.props;

		let { userAgent } = navigator;

        let theme = cookie.get('theme');
        
        if (!theme) {

            if (window.matchMedia) {

                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    theme = 'dark';
                } else {
                    theme = 'light';
                }

            } else {
                theme = 'light';
            }
            
        }

        batch(() => {

            dispatch(setTheme(theme));

            dispatch(setIsMobile(Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i))));

            dispatch(setBrowser(getBrowser(userAgent)));

		});
		
	}
	
	render() {

		const { Component, pageProps } = this.props;
		
		return <Component {...pageProps} />;
	}
}

export default wrapper.withRedux(connect()(appWithTranslation(MyApp)));
