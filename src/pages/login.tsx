import { SyntheticEvent, useState, ReactElement } from "react";
import { NextPage } from 'next';
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { login, selectAuth } from "store/slices/authSlice";
import Layout from "components/Layout";
import { wrapper } from 'store';
import routes from "utils/routes";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { appGetServerSideProps } from "utils/app";

export const getServerSideProps = wrapper.getServerSideProps(store => ctx => appGetServerSideProps(store, ctx, async () => {

    if (store.getState().auth.user.isLoggedIn) {
        return {
            redirect: {
                destination: routes.home[ctx.locale],
                permanent: false,
            }
        }
    }

    return {
        props: {
            ...(await serverSideTranslations(ctx.locale, ['login', 'common'])),
        },
    };

}));

const Login: NextPage = (): ReactElement => {

    const { t } = useTranslation();

    const auth = useSelector(selectAuth);

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleFormSubmit = (e: SyntheticEvent): void => {

        e.preventDefault();

        dispatch(login({
            email,
            password
        }));

    };

    const handleOnEmailChange = e => {

        setEmail(e.target.value);

    }

    const handleOnPasswordChange = e => {

        setPassword(e.target.value);

    }

    return (
        <Layout>
            <Head>
                <title>{t('common:log_in')}</title>
                <meta name="description" content={t('login:meta_description')} />
            </Head>
            <div className="container shadow p-5 bg-light rounded-3">
                <form onSubmit={handleFormSubmit} className="needs-validation" noValidate>
                    <div className="form-floating mb-3">
                        <input type="email" className={cn("form-control", { "is-invalid": auth.loginErrors.email })} id="email" placeholder={t('common:enter_email')} value={email} onChange={handleOnEmailChange} required />
                        <label htmlFor="email">{t('common:enter_email')}</label>
                        {auth.loginErrors.email && (
                            <p className="form-text text-danger mt-3">
                                {auth.loginErrors.email}
                            </p>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className={cn("form-control", { "is-invalid": auth.loginErrors.password })} id="password" placeholder={t('common:enter_password')} value={password} onChange={handleOnPasswordChange} required />
                        <label htmlFor="password">{t('common:enter_password')}</label>
                        {auth.loginErrors.password && (
                            <p className="form-text text-danger mt-3">
                                {auth.loginErrors.password}
                            </p>
                        )}
                    </div>
                    {auth.loginErrors.other && (
                        <p className="form-text text-danger mb-3">
                            {auth.loginErrors.other}
                        </p>
                    )}
                    <button type="submit" className="btn btn-primary" disabled={auth.isLoggingIn}>
                        {auth.isLoggingIn ? `${t('common:logging_in')}...` : t('common:log_in')}
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default Login;