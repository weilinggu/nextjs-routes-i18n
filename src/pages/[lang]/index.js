import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Home () {
  const router = useRouter()
  const { lang } = router.query

  const localizedLink = (productId) => {
    switch (lang) {
      case 'fr':
        return `/fr/produit/${productId}`
      case 'en':
      default:
        return `/en/product/${productId}`
    }
  }

  const localizedHref = (productId) => {
    switch (lang) {
      case 'fr':
        return `/[lang]/product/[productId]?lang=fr&&productId=${productId}`
      case 'en':
      default:
        return `/[lang]/product/[productId]?lang=en&&productId=${productId}`
    }
  }

  return (
    <div className='container mx-auto'>
      <Head>
        <title>NEXT -> Games Store</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header>
        <Link href={`/[lang]?lang=${lang}`} as={`/${lang}`} >
          <a>NEXT -> Games Store</a>
        </Link>
      </header>

      <main>
        <h1>Welcome to to NEXT Games Store</h1>
        <ul>
          <li>
            <Link href={localizedHref(421698)} as={localizedLink('421698')} >
              <a>Animal Crossing: New Horizons</a>
            </Link>
          </li>
          <li>
            <Link href={localizedHref(246478)} as={localizedLink('246478')} >
              <a>Fire Emblem: Three Houses</a>
            </Link>
          </li>
          <li>
            <Link href={localizedHref(292843)} as={localizedLink('292843')} >
              <a>Astral Chain</a>
            </Link>
          </li>
        </ul>
      </main>
      <footer>
        <Link href='/[lang]?lang=en' as='/en' ><a>English</a></Link>
        &nbsp;&nbsp; | &nbsp;&nbsp;
        <Link href='/[lang]?lang=fr' as='/fr' ><a>Française</a></Link>
      </footer>
    </div>
  )
}

export default Home
