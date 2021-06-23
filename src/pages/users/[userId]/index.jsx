import axios from "axios";
import Head from "next/head";
import Link from 'next/link';
import { Container, ButtonGroup, Button } from 'react-bootstrap';
import Layout from "components/Layout";

export async function getServerSideProps(ctx) {

    let { userId } = ctx.params;

	try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);

        if (!res.data) {

            return {
                notFound: true
            };

        }

		return {
			props: {
				user: res.data,
			},
        };
        
    } catch (e) {
        
		return {
            notFound: true
        };
        
	}
}

function User({ user }) {

	return (
		<Layout>
			<Head>
				<title>{user.username}</title>
			</Head>
			<Container as="section">
				<div className="d-flex flex-column align-items-center">
					<h3 className="mb-5">Info</h3>
					<span><b>Name -</b> {user.name}</span>
					<span><b>Username -</b> {user.username}</span>
					<span><b>E-mail -</b> {user.email}</span>
					<span><b>Phone -</b> {user.phone}</span>
					<span><b>Website -</b> {user.website}</span>
					<h3 className="my-5">Address</h3>
					<span><b>City -</b> {user.address.city}</span>
					<span><b>Street -</b> {user.address.street}</span>
					<span><b>Suite -</b> {user.address.suite}</span>
					<span><b>Zipcode -</b> {user.address.zipcode}</span>
					<h3 className="my-5">Company</h3>
					<span><b>Name -</b> {user.company.name}</span>
					<span><b>Catch phrase -</b> {user.company.catchPhrase}</span>
					<span><b>BS -</b> {user.company.bs}</span>
					<ButtonGroup className="my-5" aria-label="Button group">
						<Link href={`/users/${user.id}/albums`} passHref>
							<Button as="a">Albums</Button>
						</Link>
						<Link href={`/users/${user.id}/posts`} passHref>
							<Button as="a">Posts</Button>
						</Link>
						<Link href={`/users/${user.id}/todos`} passHref>
							<Button as="a">Todos</Button>
						</Link>
					</ButtonGroup>
				</div>			
			</Container>
		</Layout>
	);
}

User.defaultProps = {
	user: {},
};

export default User;
