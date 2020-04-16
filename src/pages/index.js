import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Home ({ lang }) {
  const router = useRouter()
  console.log(lang)

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
    <div style={{ padding: '2em' }} >
      <header>
        <Link href={`/[lang]?lang=${lang}`} as={`/${lang}`} >
          <a>{t('NEXT Games Store', lang)}</a>
        </Link>
        <hr />
      </header>

      <main>
        <h1>{t('Welcome to to NEXT Games Store', lang)}</h1>

        <h2>{t('Available games', lang)}:</h2>
        <ul style={{ listStyle: 'none', paddingRight: 0 }}>
          <li>
            <Link href={localizedHref('421698')} as={localizedLink('421698')} >
              <a>Animal Crossing: New Horizons</a>
            </Link>
          </li>
          <li>
            <Link href={localizedHref('246478')} as={localizedLink('246478')} >
              <a>Fire Emblem: Three Houses</a>
            </Link>
          </li>
          <li>
            <Link href={localizedHref('292843')} as={localizedLink('292843')} >
              <a>Astral Chain</a>
            </Link>
          </li>
        </ul>
      </main>

      <footer>
        <hr />
        <a href='http://headlessboost.com:3000' >English</a>
        &nbsp;&nbsp; | &nbsp;&nbsp;
        <a href='http://headlessboost.fr:3000' >Française</a>
        &nbsp;&nbsp; | &nbsp;&nbsp;
        <a href='http://headlessboost.br:3000' >Portuguese</a>
      </footer>
    </div>
  )
}

function t (text, lang) {
  // if (lang !== 'fr') {
  //   return text
  // }

  if (lang == 'fr') {
    switch (text) {
      case 'NEXT Games Store':
        return 'Boutique de jeux NEXT'
      case 'Welcome to to NEXT Games Store':
        return 'Bienvenue sur Boutique de jeux NEXT'
      case 'Available games':
        return 'Jeux disponibles'
      default:
        return text
    }
  }

if (lang == 'pt') {
  switch (text) {
    case 'NEXT Games Store':
      return 'NEXT Loja de Jogos'
    case 'Welcome to to NEXT Games Store':
      return 'Bem-vindo à NEXT Games StoreJogos disponíveis'
    case 'Available games':
      return 'Jogos disponíveis'
    default:
      return text
  }
}

return text
}

export default Home
