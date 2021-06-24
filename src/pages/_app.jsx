import App from 'next/app';
import cookie from "js-cookie";
import cookies from 'next-cookies';
import { getUserById } from 'store/slices/userSlice';
import { wrapper } from "store";
import { isBrowser } from 'utils/helpers';
import "styles/globals.scss";

class MyApp extends App {

	static getInitialProps = wrapper.getInitialAppProps(store => async ({Component, ctx}) => {	

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
	
	render() {

		const { Component, pageProps } = this.props;
		
		return <Component {...pageProps} />;
	}
}

export default wrapper.withRedux(MyApp);
