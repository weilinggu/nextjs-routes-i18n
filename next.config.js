module.exports = {
  target: 'serverless',
  experimental: {
    redirects,
    rewrites
  }
}

async function redirects () {
  return [
    { source: '/:path+/', permanent: true, destination: '/:path+' }, // remove trailing slash
    //
    // Re-writing the /_next folder does not see to work,
    // so we add two redirects for each rewrite.
    //
    {
      source: '/_next/data/:deployment/:lang(fr)/produit/:path+',
      permanent: true,
      destination: '/_next/data/:deployment/:lang/product/:path+'
    },
    {
      source: '/_next/static/:deployment/pages/[lang]/produit/:path+',
      permanent: true,
      destination: '/_next/static/:deployment/pages/[lang]/product/:path+'
    }
  ]
}

async function rewrites () {
  return [
    { source: '/:lang/produit/:path+', destination: '/:lang/product/:path+' },
    //
    // Re-writing the /_next folder does not see to work
    //
    // {
    //   source: '/_next/data/:deployment/:lang(fr)/produit/:path+',
    //   destination: '/_next/data/:deployment/:lang/product/:path+'
    // },
    // {
    //   source: '/_next/static/:deployment/pages/[lang]/produit/:path+',
    //   destination: '/_next/static/:deployment/pages/[lang]/product/:path+'
    // }
  ]
}
