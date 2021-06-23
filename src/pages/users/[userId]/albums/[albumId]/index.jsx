import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { Container, Button } from "react-bootstrap";
import Layout from "components/Layout";

export async function getServerSideProps(ctx) {
	let { albumId } = ctx.params;

	try {
		const res = await axios.get(
			`https://jsonplaceholder.typicode.com/albums/${albumId}`,
		);

		if (!res.data) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				album: res.data,
			},
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
}

function Album({ album }) {
	return (
		<Layout>
			<Head>
				<title>Album</title>
			</Head>
			<Container className="d-flex flex-column align-items-center">
				<h3><b>Album -</b> {album.title}</h3>
				<Link href={`/users/${album.userId}/albums/${album.id}/photos`} passHref>
					<Button className="mt-5" as="a">Photos gallery</Button>
				</Link>
			</Container>
		</Layout>
	);
}

Album.defaultProps = {
	album: {},
};

export default Album;
