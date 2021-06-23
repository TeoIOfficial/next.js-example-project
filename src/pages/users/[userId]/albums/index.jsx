import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { Container, ListGroup } from "react-bootstrap";
import Layout from "components/Layout";

export async function getServerSideProps(ctx) {
	let { userId } = ctx.params;

	try {
		const res = await axios.get(
			`https://jsonplaceholder.typicode.com/users/${userId}/albums`,
		);

		if (!res.data) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				albums: res.data,
			},
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
}

function Albums({ albums }) {
	return (
		<Layout>
			<Head>
				<title>Albums</title>
			</Head>
			<Container>
				<ListGroup>
					{albums.map((album) => (
						<Link
							key={album.id}
							href={`/users/${album.userId}/albums/${album.id}`}
							passHref
						>
							<ListGroup.Item action>
								{album.title}
							</ListGroup.Item>
						</Link>
					))}
				</ListGroup>
			</Container>
		</Layout>
	);
}

Albums.defaultProps = {
	albums: [],
};

export default Albums;
