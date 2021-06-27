import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import { logout, selectAuth } from "store/slices/authSlice";
import { setTheme, selectUtils } from "store/slices/utilsSlice";
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from './Breadcrumbs';
import cn from 'classnames';
import routes from "utils/routes";
import cookie from "js-cookie";
import { ReactChildren, SyntheticEvent, FC, ReactElement } from "react";
import { useTranslation } from "next-i18next";
import locales from "utils/locales";

// TODO: fixbootstrap navbar nav collapse

type LayoutProps = {
    children: ReactChildren,
    noHeader: boolean,
    noFooter: boolean,
    noBreadcrumb: boolean
};

const Layout: FC = ({ children, noHeader, noFooter, noBreadcrumb }: LayoutProps): ReactElement => {

    const { t } = useTranslation(['common']);

    const dispatch = useDispatch();

    const router = useRouter();

    const auth = useSelector(selectAuth);

    const utils = useSelector(selectUtils);

    const logoutUser = (e: SyntheticEvent): void => {

        e.preventDefault();

        dispatch(logout());

    };

    const toggleTheme = (e: SyntheticEvent): void => {

        e.preventDefault();

        if (utils.isSettingTheme) return;

        dispatch(setTheme(null));

    };

    const toggleLocale = (e: SyntheticEvent): void => {

        e.preventDefault();

        const newLocale = router.locale === locales.en.locale ? locales.bg.locale : locales.en.locale;

        cookie.set('NEXT_LOCALE', newLocale, {
            expires: 1,
            path: '/',
        });

        router.replace(router.asPath, null, { locale: newLocale });

    };

    return (
        <div className="d-flex flex-column vh-100">
            {!noHeader && (
                <header>
                    <nav className={`shadow navbar navbar-expand-lg navbar-${utils.theme} bg-${utils.theme}`}>
                        <div className="container-fluid">
                            <Link href={routes.home}>
                                <a className="navbar-brand" title={t('common:href_title_placeholder')} {...(router.asPath === routes.home ? { 'aria-current': 'page' } : {})}>
                                    <h1 className="h4">{t('common:project_name')}</h1>
                                </a>
                            </Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto align-items-center">
                                    {!auth.user.isLoggedIn && (
                                        <>
                                            <li className="nav-item">
                                                <Link href={routes.login}>
                                                    <a
                                                        className={cn("nav-link", { "active": router.asPath === routes.login })}
                                                        {...(router.asPath === routes.login ? { 'aria-current': 'page' } : {})}
                                                        title={t('common:href_title_placeholder')}
                                                    >
                                                        {t('common:log_in')}
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href={routes.register}>
                                                    <a
                                                        className={cn("nav-link", { "active": router.asPath === routes.register })}
                                                        {...(router.asPath === routes.register ? { 'aria-current': 'page' } : {})}
                                                        title={t('common:href_title_placeholder')}
                                                    >
                                                        {t('common:register')}
                                                    </a>
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    {auth.user.isLoggedIn && (
                                        <>
                                            <li className="nav-item">
                                                <Link href={routes.user_profile(auth.user.id)}>
                                                    <a
                                                        className="nav-link d-flex align-items-center"
                                                        {...(router.asPath === routes.user_profile(auth.user.id) ? { 'aria-current': 'page' } : {})}
                                                        title={t('common:href_title_placeholder')}
                                                    >
                                                        <Image src={auth.user.avatar} className="rounded-circle" alt={t('common:user_avatar')} width={45} height={45} />
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                {!auth.isLoggingOut ?
                                                    <Link href={routes.logout}>
                                                        <a className="nav-link" onClick={logoutUser} title={t('common:href_title_placeholder')}>
                                                            {t('common:log_out')}
                                                        </a>
                                                    </Link>
                                                    :
                                                    <div className="nav-link">
                                                        <span className="spinner-border nav-link-status-spinner" role="status" aria-hidden="true" />
                                                    </div>
                                                }
                                            </li>
                                        </>
                                    )}
                                    <li className="nav-item">
                                        <Link href={router.asPath}>
                                            <a className="nav-link" title={t('common:href_title_placeholder')} onClick={toggleLocale}>
                                                {(router.locale === locales.en.locale ? locales.bg.text : locales.en.text)}
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        {!utils.isSettingTheme ?
                                            <Link href={routes.theme}>
                                                <a className="nav-link" onClick={toggleTheme} title={t('common:href_title_placeholder')}>
                                                    <i className="bi bi-sun-fill" />
                                                </a>
                                            </Link>
                                            :
                                            <div className="nav-link">
                                                <span className="spinner-border nav-link-status-spinner" role="status" aria-hidden="true" />
                                            </div>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            )}
            <main className="d-flex flex-column flex-grow-1 overflow-auto">
                {!noBreadcrumb && <Breadcrumbs />}
                <div className={`flex-grow-1 overflow-auto p-md-4 p-lg-5 bg-${utils.theme}`}>
                    {children}
                </div>
            </main>
            {!noFooter && (
                <footer className="border-top">
                    <nav className={`navbar navbar-${utils.theme} bg-${utils.theme}`}>
                        <div className="container-fluid">
                            <ul className="navbar-nav mx-auto">
                                <li className="nav-item">
                                    <Link href={routes.home}>
                                        <a
                                            className={cn("nav-link", { "active": router.asPath === routes.home })}
                                            {...(router.asPath === routes.home ? { 'aria-current': 'page' } : {})}
                                            title={t('common:href_title_placeholder')}
                                        >
                                            {t('common:logo')}
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <p className="text-center">
                        <b>&copy; Copyright 2021 {process.env.CREATOR}</b>
                    </p>
                </footer>
            )}
            <style jsx>
                {`
                    .nav-link-status-spinner {
                        width: 1.25rem !important;
                        height: 1.25rem !important;
                    }
                `}
            </style>
        </div>
    )
}

Layout.defaultProps = {
    children: [],
    noHeader: false,
    noFooter: false,
    noBreadcrumb: false
};

export default Layout;