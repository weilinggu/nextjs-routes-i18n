import App from 'next/app'

const NextJSApp = ({ Component, pageProps, lang }) => {
  console.log(lang)
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

NextJSApp.getInitialProps = async({ Component, ctx }) => {
  let pageProps = {}
  let lang = 'en'
  const host = ctx.req.headers.host
  switch (host) {
    case 'headlessboost.ch:3000':
      lang =  'ger'
      break;

    case 'headlessboost.fr:3000':
      lang =  'fr'
      break;

    case 'headlessboost.com:3000':
      lang =  'en'
      break;
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps, lang }
}

export default NextJSApp