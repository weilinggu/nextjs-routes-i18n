import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
// import { createClient } from "contentful";
import contentful from '../../helpers/contentful'
// import config from "../../config.json";
import Post from "../../Components/Post"


// const client = createClient({
//   space: config.space,
//   accessToken: config.accessToken
// });

// function Home ({ lang }) {
function Home (props) {
  const { t } = useTranslation('common')
  const router = useRouter()
  console.log(props)

  const localizedLink = (productId) => {
    switch (lang) {
      case 'fr':
        return `/product/${productId}`
      case 'en':
      default:
        return `/product/${productId}`
    }
  }

  const localizedHref = (productId) => {
    switch (lang) {
      case 'fr':
        return `/product/[productId]?lang=fr&&productId=${productId}`
      case 'en':
      default:
        return `/product/[productId]?lang=en&&productId=${productId}`
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>Welcome to NextJS + Contentful by ScreamZ</title>
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css" />
      </Head>
      <div className="container grid-lg mt-2">
        <div className="columns">
          {props.allPosts && props.allPosts.map(post => <Post post={post} key={post.fields.sku} />)}
        </div>
      </div>
    </React.Fragment>
  );

  // return (
  //   <div style={{ padding: '2em' }} >
  //     <header>
  //       <Link href={`/[lang]?lang=${lang}`} as={`/${lang}`} >
  //         <a>{t('NEXT Games Store', lang)}</a>
  //       </Link>
  //       <hr />
  //     </header>

  //     <main>
  //       <h1>{t('Welcome to to NEXT Games Store', lang)}</h1>

  //       <h2>{t('Available games', lang)}:</h2>
  //       <ul style={{ listStyle: 'none', paddingRight: 0 }}>
  //         <li>
  //           <Link href={localizedHref('421698')} as={localizedLink('421698')} >
  //             <a>Animal Crossing: New Horizons</a>
  //           </Link>
  //         </li>
  //         <li>
  //           <Link href={localizedHref('246478')} as={localizedLink('246478')} >
  //             <a>Fire Emblem: Three Houses</a>
  //           </Link>
  //         </li>
  //         <li>
  //           <Link href={localizedHref('292843')} as={localizedLink('292843')} >
  //             <a>Astral Chain</a>
  //           </Link>
  //         </li>
  //       </ul>
  //     </main>

  //     <footer>
  //       <hr />
  //       <a href='http://headlessboost.com:3000' >English</a>
  //       &nbsp;&nbsp; | &nbsp;&nbsp;
  //       <a href='http://headlessboost.fr:3000' >Française</a>
  //       &nbsp;&nbsp; | &nbsp;&nbsp;
  //       <a href='http://headlessboost.br:3000' >Portuguese</a>
  //     </footer>
  //   </div>
  // )
}

// function t (text, lang) {
//   // if (lang !== 'fr') {
//   //   return text
//   // }

//   if (lang == 'fr') {
//     switch (text) {
//       case 'NEXT Games Store':
//         return 'Boutique de jeux NEXT'
//       case 'Welcome to to NEXT Games Store':
//         return 'Bienvenue sur Boutique de jeux NEXT'
//       case 'Available games':
//         return 'Jeux disponibles'
//       default:
//         return text
//     }
//   }

// if (lang == 'pt') {
//   switch (text) {
//     case 'NEXT Games Store':
//       return 'NEXT Loja de Jogos'
//     case 'Welcome to to NEXT Games Store':
//       return 'Bem-vindo à NEXT Games StoreJogos disponíveis'
//     case 'Available games':
//       return 'Jogos disponíveis'
//     default:
//       return text
//   }
// }

// return text
// }

Home.getInitialProps = async () => {
  // Get every entries in contentful from type Article, sorted by date.
  // article is the ID of the content model we created on the dashboard.
  const entries = await contentful.getEntries({
    content_type: "product",
    order: "-fields.quantity"
  });

  // Inject in props of our screen component
  return { allPosts: entries.items };
  // return {}
};

export default Home
