import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { useRouter } from 'next/router'

function ProductPage ({ product }) {
  const router = useRouter()
  const { lang, productId } = router.query

  return (
    <>
      <header>
        <Link href={`/[lang]?lang=${lang}`} as={`/${lang}`} >
          <a>{t('NEXT Games Store', lang)}</a>
        </Link>
        <hr />
      </header>

      <main>
        <div>
          <p><b>{t('Name', lang)}</b>:</p>
          <p>{product.name}</p>
        </div>
        <div>
          <p><b>{t('Description', lang)}</b>:</p>
          <div dangerouslySetInnerHTML={{ __html: product.description}} />
        </div>
        <div>
          <img
            style={{maxWidth: 300}}
            src={product.background_image}
            alt={`${t('Image for')}: ${product.name}`}
          />
        </div>
      </main>

      <footer>
        <hr />

        <Link
          href={`/[lang]/product/[productId]?lang=en&productId=${productId}`}
          as={`/en/product/${productId}`}
        >
          <a>English</a>
        </Link>

        &nbsp;&nbsp; | &nbsp;&nbsp;

        <Link
          href={`/[lang]/product/[productId]?lang=fr&productId=${productId}`}
          as={`/fr/produit/${productId}`}
        >
          <a>Française</a>
        </Link>
      </footer>
    </>
  )
}

function t (name, lang) {
  if (lang !== 'fr') {
    return name
  }

  switch (name) {
    case 'NEXT Games Store':
      return 'Boutique de jeux NEXT'
    case 'Name':
      return 'Nom'
    case 'Description':
      return 'Description (uniquement disponible en anglais)'
    case 'Image for':
      return 'Image pour'
    default:
      return name
  }
}

export async function getServerSideProps ({ query }) {
  const { productId } = query
  const product = await (await fetch(`https://api.rawg.io/api/games/${productId}`)).json()

  return { props: { product } }
}

export default ProductPage
