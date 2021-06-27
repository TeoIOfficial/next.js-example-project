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
import { ReactNode, SyntheticEvent, ReactElement } from "react";
import { useTranslation } from "next-i18next";
import locales from "utils/locales";
import themes from "utils/themes";

// TODO: fixbootstrap navbar nav collapse

type LayoutProps = {
    children: ReactNode,
    noHeader: boolean,
    noFooter: boolean,
    noBreadcrumb: boolean
};

const Layout = ({ children, noHeader, noFooter, noBreadcrumb }: LayoutProps): ReactElement => {

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

        router.replace(router.route, null, { locale: newLocale });

    };

    return (
        <div className="d-flex flex-column vh-100">
            {!noHeader && (
                <header>
                    <nav className={`shadow navbar navbar-expand-lg navbar-${utils.theme} bg-${utils.theme}`}>
                        <div className="container-fluid">
                            <Link href={routes.home[router.locale]}>
                                <a className="navbar-brand" title={t('common:href_title_placeholder')} {...(router.route === routes.home.en ? { 'aria-current': 'page' } : {})}>
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
                                                <Link href={routes.login[router.locale]}>
                                                    <a
                                                        className={cn("nav-link", { "active": router.route === routes.login.en })}
                                                        {...(router.route === routes.login.en ? { 'aria-current': 'page' } : {})}
                                                        title={t('common:href_title_placeholder')}
                                                    >
                                                        {t('common:log_in')}
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link href={routes.register[router.locale]}>
                                                    <a
                                                        className={cn("nav-link", { "active": router.route === routes.register.en })}
                                                        {...(router.route === routes.register.en ? { 'aria-current': 'page' } : {})}
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
                                                <Link href={routes.user_profile(auth.user.id)[router.locale]}>
                                                    <a
                                                        className="nav-link d-flex align-items-center"
                                                        {...(router.route === routes.user_profile(auth.user.id).en ? { 'aria-current': 'page' } : {})}
                                                        title={t('common:href_title_placeholder')}
                                                    >
                                                        <Image src={auth.user.avatar} className="rounded-circle" alt={t('common:user_avatar')} width={45} height={45} />
                                                    </a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                {!auth.isLoggingOut ?
                                                    <Link href={routes.logout[router.locale]}>
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
                                        <Link href={router.route}>
                                            <a className="nav-link" title={t('common:href_title_placeholder')} onClick={toggleLocale}>
                                                {(router.locale === locales.en.locale ? locales.bg.text : locales.en.text)}
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        {!utils.isSettingTheme ?
                                            <Link href={routes.theme[router.locale]}>
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
                <footer className={`border-top bg-${utils.theme}`}>
                    <nav className={`navbar navbar-${utils.theme} bg-${utils.theme}`}>
                        <div className="container-fluid">
                            <ul className="navbar-nav mx-auto">
                                <li className="nav-item">
                                    <Link href={routes.home[router.locale]}>
                                        <a
                                            className={cn("nav-link", { "active": router.route === routes.home.en })}
                                            {...(router.route === routes.home.en ? { 'aria-current': 'page' } : {})}
                                            title={t('common:href_title_placeholder')}
                                        >
                                            {t('common:logo')}
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <p className={cn("text-center", { 'text-light': utils.theme === themes.dark })}>
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