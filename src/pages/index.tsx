import Head from "next/head";
import Link from "next/link";
import { NextPage } from 'next';
import Layout from "components/Layout";
import { selectUtils } from 'store/slices/utilsSlice';
import { selectAuth } from 'store/slices/authSlice';
import { useSelector } from "react-redux";
import routes from "utils/routes";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { ReactElement } from "react";
import { wrapper } from 'store';
import { appGetServerSideProps } from "utils/app";
import Clock from 'components/Clock';

export const getServerSideProps = wrapper.getServerSideProps(store => ctx => appGetServerSideProps(store, ctx, async () => {

	return {
		props: {
			...(await serverSideTranslations(ctx.locale, ['home', 'common'])),
		},
	};

}));

const Home: NextPage = (): ReactElement => {

	const utils = useSelector(selectUtils);

	const auth = useSelector(selectAuth);

	const { t } = useTranslation();

	return (
		<Layout>
			<Head>
				<title>{t('common:project_name')}</title>
				<meta name="description" content={t('home:meta_description')} />
			</Head>
			<section className="d-flex flex-column align-items-center text-center m-5">
				<h2 className="text-success">{t('home:greeting', { name: auth.user.username || t('common:friend') })}!</h2>
				<div className="shadow-lg p-5 my-5 rounded-3 bg-light">
					<p className="h3">{t('home:info_message')}:</p>
					<p className="h3 mt-5">{t('home:currently_using')} <b className="text-danger">{utils.browser.name} / {utils.browser.version}</b> {t('home:browser_on')} <b className="text-danger">{utils.isMobile ? t('common:mobile_device') : t('common:desktop_device')}</b>.</p>
					<p className="h3 mt-5">
						{t('home:current_time')}: <Clock className="text-success" />
					</p>
				</div>
				{!auth.user.isLoggedIn && (
					<div className="shadow-lg p-5 mt-5 rounded-3 d-flex flex-column align-items-center bg-light">
						<Link href={routes.login}>
							<a className="btn btn-primary btn-lg" title="This is an anchor title for SEO purposes">
								{t('common:log_in')}
							</a>
						</Link>
						<span className="my-2">{t('common:or')}</span>
						<Link href={routes.register}>
							<a className="btn btn-primary btn-lg" title="This is an anchor title for SEO purposes">
								{t('common:register_new')}
							</a>
						</Link>
					</div>
				)}
			</section>
		</Layout>
	);
}

export default Home;