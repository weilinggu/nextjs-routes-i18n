import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { useRouter } from 'next/router'

function ProductPage ({ product, lang }) {
  const router = useRouter()
  const { productId } = router.query

  return (
    <>
      <header>
        <Link href={`/`}>
          <a>{t('NEXT Games Store', lang)}</a>
        </Link>
        <hr />
      </header>

      <main>
        <div>
        <Link href='/' ><a>BUY!!!</a></Link>
        </div>
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

        <a
          href={`http://headlessboost.com:3000/product/${productId}`}
        >
          English
        </a>

        &nbsp;&nbsp; | &nbsp;&nbsp;

        <a
          href={`http://headlessboost.fr:3000/product/${productId}`}
        >
          Française
        </a>
        &nbsp;&nbsp; | &nbsp;&nbsp;

        <a
          href={`http://headlessboost.br:3000/product/${productId}`}
        >
          Portuguese
        </a>
      </footer>
    </>
  )
}

function t (name, lang) {
  if (lang == 'fr') {
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
  if (lang == 'pt') {
    switch (name) {
      case 'NEXT Games Store':
        return 'NEXT Loja de Jogos'
      case 'Name':
        return 'nome'
      case 'Description':
        return 'Description (descrição)'
      case 'Image for':
        return 'Imagem para'
      default:
        return name
    }
  }

  return name
  
}

export async function getServerSideProps ({ query }) {
  const { productId } = query
  const product = await (await fetch(`https://api.rawg.io/api/games/${productId}`)).json()

  return { props: { product } }
}

export default ProductPage
