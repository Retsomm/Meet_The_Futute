import { Inter, JetBrains_Mono, Source_Serif_4 } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Navigation from './components/Navigation';
import Providers from './components/Providers';
import { AlertProvider } from './components/Alert';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from './components/ThemeProvider';
import GoogleAnalytics from './components/GoogleAnalytics';
import ThemeScript from './components/ThemeScript';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const sourceSerif4 = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Meet The Future',
    template: '%s | Meet The Future',
  },
  description:
    '追蹤你與未來自己的差距，量化你的成長進度。設定目標、記錄進度、實現夢想。',
  keywords: ['目標追蹤', '個人成長', '進度管理', '自我提升', '目標管理', '生產力'],
  authors: [{ name: 'Meet The Future Team' }],
  creator: 'Meet The Future Team',
  publisher: 'Meet The Future',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  alternates: {
    canonical: '/',
    languages: {
      'zh-TW': '/zh-TW',
      'zh-CN': '/zh-CN',
      'en-US': '/en-US',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: '/',
    title: 'Meet The Future - 追蹤你與未來自己的差距',
    description:
      '追蹤你與未來自己的差距，量化你的成長進度。設定目標、記錄進度、實現夢想。',
    siteName: 'Meet The Future',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Meet The Future - 目標追蹤平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet The Future - 追蹤你與未來自己的差距',
    description:
      '追蹤你與未來自己的差距，量化你的成長進度。設定目標、記錄進度、實現夢想。',
    images: ['/og-image.jpg'],
    creator: '@meetthefuture',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  icons: {
    icon: '/icons/logo.svg',
    shortcut: '/icons/logo.svg',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/svg+xml" href="/icons/logo.svg" />
        <meta name="theme-color" content="#c96442" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Meet The Future" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Meet The Future" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${sourceSerif4.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <GoogleAnalytics />
        <ThemeProvider>
          <Providers>
            <AlertProvider>
              <ScrollToTop />
              <Navigation />
              <main className="min-h-screen">{children}</main>
            </AlertProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
