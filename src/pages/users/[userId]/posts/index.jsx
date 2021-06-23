import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { Container, Accordion, Card, Button } from "react-bootstrap";
import Layout from "components/Layout";

export async function getServerSideProps(ctx) {
	let { userId } = ctx.params;

	try {
		const res = await axios.get(
			`https://jsonplaceholder.typicode.com/users/${userId}/posts`,
		);

		if (!res.data) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				posts: res.data,
			},
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
}

function Posts({ posts }) {

	return (
		<Layout>
			<Head>
				<title>Posts</title>
			</Head>
			<Container>
				<Accordion defaultActiveKey="0">
					{posts.map((post, index) => (
						<Card key={post.id}>
							{/* <Accordion.Toggle as={Card.Header} eventKey={index}>
								{post.title}
							</Accordion.Toggle> */}
							<Accordion.Collapse eventKey={index}>
								<Card.Body>
									<p>{post.body}</p>
									<Link href={`/users/${post.userId}/posts/${post.id}`} passHref>
										<Button as="a">Check out the post</Button>
									</Link>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					))}
				</Accordion>
			</Container>
		</Layout>
	);
}

Posts.defaultProps = {
	posts: [],
};

export default Posts;
