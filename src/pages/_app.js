import i18next from 'i18next';
import { getI18n, initReactI18next, useSSR } from 'react-i18next';


const NextJSApp = ({ Component, pageProps, lang }) => {
    console.log(lang)
    const isServer = typeof window === 'undefined'
    const i18n = isServer
        ? i18next.createInstance()
        : getI18n() || i18next.createInstance()
    if (!i18n.isInitialized) {
        // i18n.addResourceBundle
        i18n
            .use(initReactI18next)
            .init({
                lng: lang,
                resources: {
                    en: {
                        common: {
                            'NEXT Games Store': 'NEXT Games Store',
                            'Welcome to to NEXT Games Store': 'Welcome to to NEXT Games Store',
                            'Available games': 'Available games'
                        },
                    },
                    fr: {
                        common: {
                            'NEXT Games Store': 'Boutique de jeux NEXT',
                            'Welcome to to NEXT Games Store': 'Bienvenue sur Boutique de jeux NEXT',
                            'Available games': 'Jeux disponibles',
                            'NEXT Games Store': 'Boutique de jeux NEXT',
                            'Name': 'Nom',
                            'Description': 'Description (uniquement disponible en anglais)',
                            'Image for': 'Image pour'
                        },
                    },
                    pt: {
                        common: {
                            'NEXT Games Store': 'NEXT Loja de Jogos',
                            'Welcome to to NEXT Games Store': 'Bem-vindo à NEXT Games Store',
                            'Available games': 'Jogos disponíveis',
                            'NEXT Games Store': 'NEXT Loja de Jogos',
                            'Name': 'nome',
                            'Description': 'Description (descrição)',
                            'Image for': 'Imagem para'
                        }
                    }
                },
                keySeparator: false,
                interpolation: {
                    escapeValue: false
                }
            })
    }

    return (
        <>
            <Component {...pageProps} lang={lang} />
        </>
    );
};

NextJSApp.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    let lang = 'en';
    if (ctx && ctx.req) {
        const host = ctx.req.headers.host;
        switch (host) {
            case 'headlessboost.ch:3000':
                lang = 'ger';
                break;

            case 'headlessboost.fr:3000':
                lang = 'fr';
                break;

            case 'headlessboost.com:3000':
                lang = 'en';
                break;

            case 'headlessboost.br:3000':
                lang = 'pt';
                break;
        }
    }
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, lang };
};

export default NextJSApp;
