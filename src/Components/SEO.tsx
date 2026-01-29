import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  noIndex?: boolean
}

const SITE_NAME = 'Kyaw Paing Oo | Full Stack Developer'
const DEFAULT_DESCRIPTION = 'Full Stack Developer from Myanmar specializing in React, Node.js, .NET, and cloud services. Building scalable web applications as a digital nomad.'
const BASE_URL = 'https://kyawpaingoo.dev'

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = '/og-image.png',
  noIndex = false
}: SEOProps) {
  const pageTitle = title ? `${title} | Kelvin Dev` : SITE_NAME
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${BASE_URL}${ogImage}`} />
      <meta property="og:site_name" content="Kelvin Dev Portfolio" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${BASE_URL}${ogImage}`} />
    </Helmet>
  )
}
