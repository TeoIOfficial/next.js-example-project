import axios from "axios";
import Head from "next/head";
import { Container, ListGroup, Badge } from 'react-bootstrap';
import Layout from "components/Layout";

export async function getServerSideProps(ctx) {

    let { userId } = ctx.params;

	try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);

        if (!res.data) {

            return {
                notFound: true
            };

        }

		return {
			props: {
				todos: res.data,
			},
        };
        
    } catch (e) {
        
		return {
            notFound: true
        };
        
	}
}

function Todos({ todos }) {
	
	return (
		<Layout>
			<Head>
				<title>Todos</title>
			</Head>
			<Container>
				<ListGroup>
					{todos.map(todo => (
						<ListGroup.Item
							key={todo.id}
							className="d-flex justify-content-between align-items-center"
							disabled={!todo.completed}
						>
							{todo.title}
							<Badge variant={todo.completed ? 'success' : 'danger'}>{todo.completed ? 'Completed' : 'Uncompleted'}</Badge>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Container>
		</Layout>
	);
}

Todos.defaultProps = {
	todos: [],
};

export default Todos;
