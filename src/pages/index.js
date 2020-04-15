import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Home () {
  const router = useRouter()
  const { lang } = router.query

  const localizedLink = (productId) => {
    switch (lang) {
      case 'fr':
        return `/produit/${productId}`
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
        <Link href='/[lang]?lang=en' as='/en' ><a>English</a></Link>
        &nbsp;&nbsp; | &nbsp;&nbsp;
        <Link href='/[lang]?lang=fr' as='/fr' ><a>Française</a></Link>
      </footer>
    </div>
  )
}

function t (text, lang) {
  if (lang !== 'fr') {
    return text
  }

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

export default Home
