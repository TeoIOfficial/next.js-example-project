import { NextPage } from 'next';
import Link from 'next/link';
import Layout from 'components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { appGetServerSideProps } from 'utils/app';
import { wrapper } from 'store';
import { useTranslation } from 'next-i18next';
import { SyntheticEvent } from 'react';
import routes from 'utils/routes';
import { useRouter } from 'next/router';
import Head from "next/head";

type StatusCode = number;

interface ErrorProps {
  statusCode?: StatusCode;
}

export const getServerSideProps = wrapper.getServerSideProps(store => ctx => appGetServerSideProps(store, ctx, async () => {

  const { res, locale } = ctx;

  const statusCode = res ? res.statusCode : 404;

  return {
    props: {
      statusCode,
      ...(await serverSideTranslations(locale, ['error', 'common'])),
    },
  };

}));

const Error: NextPage<ErrorProps> = ({ statusCode }) => {

  const router = useRouter();

  const { t } = useTranslation();

  const setErrorMessage = (statusCode: StatusCode): string => {

    switch (statusCode) {
      case 404:
        return t('common:error_404');
      case 500:
        return t('common:error_500');
      default:
        return t('common:unknown_error');
    }

  };

  const handleGoBack = (e: SyntheticEvent) => {

    e.preventDefault();

    router.back();

  };

  return (
    <Layout noBreadcrumb>
      <Head>
        <title>{t('common:error')}</title>
        <meta name="description" content={t('error:meta_description')} />
      </Head>
      <section className="d-flex flex-column align-items-center text-center m-5">
        <p className="display-1 text-center text-danger">{statusCode}</p>
        <div className="shadow-lg p-5 mt-5 rounded-3 d-flex flex-column align-items-center bg-light">
          <p className="display-4 text-center text-danger">{setErrorMessage(statusCode)}!</p>
          <Link href={routes.goBack}>
            <a className="btn btn-success btn-lg mt-5" title="This is an anchor title for SEO purposes" onClick={handleGoBack}>
              {t('common:go_back')}
            </a>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

Error.defaultProps = {
  statusCode: null,
};

export default Error;
