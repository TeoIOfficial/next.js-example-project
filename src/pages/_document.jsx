import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

    static async getInitialProps(ctx) {
      
        const initialProps = await Document.getInitialProps(ctx);
        
        return { ...initialProps };
        
  }

  render() {
    return (
      <Html lang="en" dir="ltr">
          <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=1.0"
          />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

          <meta name="description" content="Next.js, redux and bootstrap boilerplate" />

          <meta name="google" content="notranslate" />

          <meta name="p:domain_verify" content="google verification code" />

          {/* iOS */}
          <meta property="al:ios:url" content="applinks://docs"/>
          <meta property="al:ios:app_store_id" content="12345"/>
          <meta property="al:ios:app_name" content="App Links"/>
          
          {/* Android */}
          <meta property="al:android:url" content="applinks://docs"/>
          <meta property="al:android:app_name" content="App Links"/>
          <meta property="al:android:package" content="org.applinks"/>
          
          {/* Web fall back */}
          <meta property="al:web:url" content="https://applinks.org/documentation"/>
          
          {/* Add these tags if you have multilingual website. Add tags for every language your website supports. */}
          <link rel="alternate" hrefLang="en" href="yourwebsite.com" />
          <link rel="alternate" hrefLang="x-default" href="yourwebsite.com" />

          {/* <base href="https://example.com/" /> */}
          </Head>
        <body>
          {/* add class notranslate to body if you don't want google to translate your website */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
};