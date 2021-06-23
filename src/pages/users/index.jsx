import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import { wrapper } from "store";
import { Container, Table, Row, Col, Card, ListGroup } from 'react-bootstrap';
import Layout from "components/Layout";

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {

	if (!store.getState().user.isLoggedIn) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

	try {
		const res = await axios.get("https://jsonplaceholder.typicode.com/users");

		if (!res.data) {

			return {
				notFound: true
			};

		}
		
		return {
			props: {
				users: res.data,
			},
		};

	} catch (e) {

		return {
			props: {
				users: [],
			},
		};
		
	}
});

function Users({ users }) {

	const router = useRouter();

	const onUserClick = (id) => {

		router.push(`/users/${id}`);

	};

	return (
		<Layout>
			<Head>
				<title>Users</title>
			</Head>
			<Container as="section" fluid>
				<Table responsive striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Username</th>
							<th>E-mail</th>
							<th>Phone</th>
							<th>Website</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id} style={{cursor: 'pointer'}} onClick={() => onUserClick(user.id)}>
								<td>{user.id}</td>
								<td>{user.name}</td>
								<td>{user.username}</td>
								<td>{user.email}</td>
								<td>{user.phone}</td>
								<td>{user.website}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Container>
			<Container as="section" fluid className="my-5">
				<Row lg={5} md={4} xs={2} className="g-2">
					{users.map((user) => (
						<Col key={user.id}>
							<Card>
								<Card.Header>This is a user card</Card.Header>
								<Card.Body>
									<Card.Title>User # {user.id}</Card.Title>
									<ListGroup>
										<ListGroup.Item><b>Name - </b>{user.name}</ListGroup.Item>
										<ListGroup.Item><b>Username - </b>{user.username}</ListGroup.Item>
										<ListGroup.Item><b>E-mail - </b>{user.email}</ListGroup.Item>
										<ListGroup.Item><b>Phone - </b>{user.phone}</ListGroup.Item>
										<ListGroup.Item><b>Website - </b>{user.website}</ListGroup.Item>
									</ListGroup>
								</Card.Body>
								<Card.Body>
									<Link href={`/users/${user.id}`} passHref>
										<Card.Link>
											Profile
										</Card.Link>
									</Link>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</Layout>
	);
}

Users.defaultProps = {
	users: [],
};

export default Users;
