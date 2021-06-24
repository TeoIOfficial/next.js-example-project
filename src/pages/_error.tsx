import {NextPage, NextPageContext} from 'next';
import Layout from 'components/Layout';

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <Layout noBreadcrumb>
        <p className="display-3 text-center text-danger">
          {statusCode ? `An error ${statusCode} occurred on server` : '404 - Page Not Found'}
        </p>
    </Layout>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error