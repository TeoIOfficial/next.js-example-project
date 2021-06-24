import {NextPage} from 'next';
import Layout from 'components/Layout';

const Custom404: NextPage = () => {
    return (
        <Layout noBreadcrumb>
            <p className="display-3 text-center text-danger">404 - Page Not Found</p>
        </Layout>
    );
}

export default Custom404;
