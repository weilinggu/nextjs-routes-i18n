import App from 'next/app'

const NextJSApp = ({ Component, pageProps, lang }) => {
    return (
        <>
            <Component {...pageProps} lang={lang} />
        </>
    )
}

NextJSApp.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {}
    let lang = 'en'
    if (ctx && ctx.req) {
        const host = ctx.req.headers.host
        switch (host) {
            case 'headlessboost.ch:3000':
                lang = 'ger'
                break;

            case 'headlessboost.fr:3000':
                lang = 'fr'
                break;

            case 'headlessboost.com:3000':
                lang = 'en'
                break;

            case 'headlessboost.br:3000':
                lang = 'pt'
                break;
        }
    }
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps, lang }
}

export default NextJSApp