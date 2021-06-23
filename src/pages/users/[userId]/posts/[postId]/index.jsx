import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { Container, Button } from "react-bootstrap";
import Layout from "components/Layout";

export async function getServerSideProps(ctx) {
	let { postId } = ctx.params;

	try {
		const res = await axios.get(
			`https://jsonplaceholder.typicode.com/posts/${postId}`,
        );
        
		if (!res.data) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				post: res.data,
			},
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
}

function Post({ post }) {
	return (
		<Layout>
			<Head>
				<title>Post</title>
			</Head>
			<Container className="d-flex flex-column align-items-center">
                <h3><b>Post -</b> {post.title}</h3>
                <p>{post.body}</p>
				<Link href={`/users/${post.userId}/posts/${post.id}/comments`} passHref>
					<Button className="mt-5" as="a">Check out the comments</Button>
				</Link>
			</Container>
		</Layout>
	);
}

Post.defaultProps = {
	post: {},
};

export default Post;
