import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "components/Layout";

export async function getServerSideProps(ctx) {

    let { albumId } = ctx.params;

	try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);

        if (!res.data) {

            return {
                notFound: true
            };

        }

		return {
			props: {
				photos: res.data,
			},
        };
        
    } catch (e) {
        
		return {
            notFound: true
        };
        
	}
}

function Photos({ photos }) {

	return (
		<Layout>
			<Head>
				<title>Photos</title>
			</Head>
            <Container className="mb-5">
                <Row className="g-2">
                    {photos.map(photo => (
                        <Col xs={2} key={photo.id} className="d-flex justify-content-center">
                            <Image src={photo.thumbnailUrl} className="rounded" alt="Photo" width={150} height={150}/>
                        </Col>
                    ))}
                </Row>
            </Container>    
		</Layout>
	);
}

Photos.defaultProps = {
	photos: [],
};

export default Photos;
