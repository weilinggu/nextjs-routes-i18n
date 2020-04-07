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
          <a>NEXT -> Games Store</a>
        </Link>
      </header>

      <main>
        <div>{product.name}</div>
      </main>

      <footer>
        <Link
          href={`/[lang]/product/[productId]?lang=en&productId=${productId}`}
          as={`/en/product/${productId}`}
        >
          <a>English</a>
        </Link>

        &nbsp;&nbsp; | &nbsp;&nbsp;

        <Link
          href={`/[lang]/produit/[productId]?lang=fr&productId=${productId}`}
          as={`/fr/produit/${productId}`}
        >
          <a>Française</a>
        </Link>
      </footer>
    </>
  )
}

export async function getServerSideProps ({ query }) {
  const { productId } = query
  const product = await (await fetch(`https://api.rawg.io/api/games/${productId}`)).json()

  return { props: { product } }
}

export default ProductPage
