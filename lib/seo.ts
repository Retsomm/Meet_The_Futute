import type { Metadata } from 'next';

interface MetadataParams {
  title?: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

export const generateMetadata = ({
  title,
  description,
  keywords = [],
  image = '/og-image.jpg',
  url = '/',
  type = 'website',
  noIndex = false,
}: MetadataParams): Metadata => {
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
      type: type as 'website',
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

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

interface BreadcrumbStructuredData {
  '@context': string;
  '@type': 'BreadcrumbList';
  itemListElement: ListItem[];
}

export const generateBreadcrumbStructuredData = (
  breadcrumbs: BreadcrumbItem[]
): BreadcrumbStructuredData => {
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

interface OrganizationStructuredData {
  '@context': string;
  '@type': 'Organization';
  name: string;
  description: string;
  url: string;
  logo: string;
  sameAs: string[];
  contactPoint: {
    '@type': 'ContactPoint';
    contactType: string;
    availableLanguage: string[];
  };
}

export const generateOrganizationStructuredData =
  (): OrganizationStructuredData => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Meet The Future',
      description:
        '追蹤你與未來自己的差距，量化你的成長進度。設定目標、記錄進度、實現夢想。',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      sameAs: [],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['Chinese', 'English'],
      },
    };
  };

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQStructuredData {
  '@context': string;
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export const generateFAQStructuredData = (
  faqs: FAQItem[]
): FAQStructuredData => {
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
