/**
 * SEO 工具函數
 * 用於生成動態 metadata 和結構化資料
 */

export const generateMetadata = ({
  title,
  description,
  keywords = [],
  image = '/og-image.jpg',
  url = '/',
  type = 'website',
  noIndex = false,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const fullUrl = `${baseUrl}${url}`;
  
  return {
    title: title ? `${title} | Meet The Future` : 'Meet The Future',
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: title ? `${title} | Meet The Future` : 'Meet The Future',
      description,
      url: fullUrl,
      type,
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title || 'Meet The Future',
        },
      ],
      siteName: 'Meet The Future',
      locale: 'zh_TW',
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | Meet The Future` : 'Meet The Future',
      description,
      images: [`${baseUrl}${image}`],
      creator: '@meetthefuture',
    },
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
};

export const generateBreadcrumbStructuredData = (breadcrumbs) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.url}`,
    })),
  };
};

export const generateOrganizationStructuredData = () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Meet The Future',
    description: '追蹤你與未來自己的差距，量化你的成長進度。設定目標、記錄進度、實現夢想。',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      // 如果有社群媒體帳號，可以在這裡新增
      // 'https://twitter.com/meetthefuture',
      // 'https://facebook.com/meetthefuture',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Chinese', 'English'],
    },
  };
};

export const generateFAQStructuredData = (faqs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};
