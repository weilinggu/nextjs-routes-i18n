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
    // { source: '/', permanent: true, destination: '/en' }, // redirect home to english
    //
    // Re-writing the /_next folder does not seem to work,
    // so we add a redirect for each rewrite.
    //
    {
      source: '/_next/data/:deployment/:lang/produit/:path+',
      permanent: true,
      destination: '/_next/data/:deployment/:lang/product/:path+'
    },
  ]
}

async function rewrites () {
  return [
    { source: '/:lang/produit/:path+', destination: '/:lang/product/:path+' },
    //
    // Re-writing the /_next folder does not seem to work
    //
    // {
    //   source: '/_next/data/:deployment/:lang/produit/:path+',
    //   destination: '/_next/data/:deployment/:lang/product/:path+'
    // },
  ]
}
