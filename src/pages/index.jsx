import Head from "next/head";
import Link from "next/link";
import Layout from "components/Layout";
import { selectUtils } from 'store/slices/utilsSlice';
import { selectUser } from 'store/slices/userSlice';
import { useSelector } from "react-redux";


export default function Home() {

	const utils = useSelector(selectUtils);

	const user = useSelector(selectUser);

	return (
		<Layout>
			<Head>
				<title>Home</title>
			</Head>
			<section className="d-flex flex-column align-items-center text-center m-5">
				<h2 className="text-success">Greetings, friend!</h2>
				<h3 className="text-muted mt-5">This is meant to be a big enterprise project, but for now its just a boilerplate!</h3>
				<div className="shadow-lg p-5 my-5 rounded-3 bg-light">
					<p className="h3">Here&apos;s some information we&apos;ve gathered about you:</p>
					<p className="h3 mt-5">You&apos;re currently using a <b className="text-danger">{utils.browser.name} / {utils.browser.version}</b> browser on a <b className="text-danger">{ utils.isMobile ? 'mobile device' : 'desktop device'}</b>.</p>
				</div>
				{!user.isLoggedIn && (
					<>
						<h2 className="text-success">Feel free to:</h2>
						<div className="shadow-lg p-5 mt-5 rounded-3 d-flex flex-column align-items-center bg-light">
							<Link href="/login">
								<a className="btn btn-primary btn-lg" title="This is an anchor title for SEO purposes">
									Log in
								</a>
							</Link>
							<span className="my-2">or</span>
							<Link href="/register">
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
