import axios from "axios";
import Head from "next/head";
import { Container, Card } from "react-bootstrap";
import Layout from "components/Layout";

export async function getServerSideProps(ctx) {

    let { postId } = ctx.params;

	try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);

        if (!res.data) {

            return {
                notFound: true
            };

        }

		return {
			props: {
				comments: res.data,
			},
        };
        
    } catch (e) {
        
		return {
            notFound: true
        };
        
	}
}

function Comments({ comments }) {

	return (
		<Layout>
			<Head>
				<title>Comments</title>
			</Head>
            <Container>
                {comments.map(comment => (
                    <Card key={comment.id} className="shadow text-center mb-3">
                        <Card.Body>
                            <Card.Title>{comment.name}</Card.Title>
                            <Card.Subtitle className="text-muted mt-2">{comment.email}</Card.Subtitle>
                            <Card.Text className="my-4">{comment.body}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </Container>    
		</Layout>
	);
}

Comments.defaultProps = {
	comments: [],
};

export default Comments;
