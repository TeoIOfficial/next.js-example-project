import Head from "next/head";
import Link from "next/link";
import {NextPage} from 'next';
import Layout from "components/Layout";
import { selectUtils } from 'store/slices/utilsSlice';
import { selectUser } from 'store/slices/userSlice';
import { useSelector } from "react-redux";
import routes from "utils/routes";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export async function getServerSideProps({locale}) {

	return {
		props: {
		...(await serverSideTranslations(locale, ['home', 'common'])),
		},
  };
    
};

const Home: NextPage = () => {

	const utils = useSelector(selectUtils);

	const user = useSelector(selectUser);

	const { t } = useTranslation('common');

	return (
		<Layout>
			<Head>
				<title>Home</title>
			</Head>
			<section className="d-flex flex-column align-items-center text-center m-5">
				<h2 className="text-success">{t('home:greeting', {name: user.username || t('common:friend')})}!</h2>
				<h3 className="text-muted mt-5">{t('home:subtitle')}!</h3>
				<div className="shadow-lg p-5 my-5 rounded-3 bg-light">
					<p className="h3">{t('home:info_message')}:</p>
					<p className="h3 mt-5">You&apos;re currently using a <b className="text-danger">{utils.browser.name} / {utils.browser.version}</b> browser on a <b className="text-danger">{ utils.isMobile ? 'mobile device' : 'desktop device'}</b>.</p>
				</div>
				{!user.isLoggedIn && (
					<>
						<h2 className="text-success">Feel free to:</h2>
						<div className="shadow-lg p-5 mt-5 rounded-3 d-flex flex-column align-items-center bg-light">
							<Link href={routes.login}>
								<a className="btn btn-primary btn-lg" title="This is an anchor title for SEO purposes">
									Log in
								</a>
							</Link>
							<span className="my-2">or</span>
							<Link href={routes.register}>
								<a className="btn btn-primary btn-lg" title="This is an anchor title for SEO purposes">
									Register a new account
								</a>
							</Link>
						</div>
					</>
				)}
			</section>
		</Layout>
	);
}

export default Home;