import { batch, useDispatch } from "react-redux";
import cookie from "js-cookie";
import { setTheme, setBrowser, setIsMobile } from "store/slices/utilsSlice";
import { wrapper } from "store";
import { getBrowser } from 'utils/helpers';
import { appWithTranslation } from 'next-i18next';
import "styles/globals.scss";
import themes from 'utils/themes';
import { useEffect } from 'react';
import { AppProps } from "next/app";
import { ReactElement } from "react";

const App = ({ Component, pageProps }: AppProps): ReactElement => {

    let dispatch = useDispatch();

    useEffect(() => {

        let { userAgent } = navigator;

        let theme = cookie.get('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? themes.light : themes.dark);

        batch(() => {

            dispatch(setTheme(theme));

            dispatch(setIsMobile(Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i))));

            dispatch(setBrowser(getBrowser(userAgent)));

        });
        
    }, [dispatch]);

    return <Component {...pageProps} />
    
};

export default wrapper.withRedux(appWithTranslation(App));
