import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

export default class MyDocument extends Document {

    static async getInitialProps(ctx: DocumentContext) {
      
        const initialProps = await Document.getInitialProps(ctx);
        
        return { ...initialProps };
        
  }

  render() {
    return (
      <Html dir="ltr">
          <Head>
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
          <link rel="alternate" hrefLang="bg" href="yourwebsite.com/bg" />
          <link rel="alternate" hrefLang="x-default" href="yourwebsite.com" />

          {/* <base href="https://example.com/" /> */}
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
          <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
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