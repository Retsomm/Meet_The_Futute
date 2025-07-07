import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Providers from "./components/Providers";
import { AlertProvider } from "./components/Alert";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./components/ThemeProvider";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ThemeScript from "./components/ThemeScript";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Meet The Future",
    template: "%s | Meet The Future"
  },
  description: "追蹤你與未來自己的差距，量化你的成長進度。設定目標、記錄進度、實現夢想。",
  keywords: ["目標追蹤", "個人成長", "進度管理", "自我提升", "目標管理", "生產力"],
  authors: [{ name: "Meet The Future Team" }],
  creator: "Meet The Future Team",
  publisher: "Meet The Future",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
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
    description: '追蹤你與未來自己的差距，量化你的成長進度。設定目標、記錄進度、實現夢想。',
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
    description: '追蹤你與未來自己的差距，量化你的成長進度。設定目標、記錄進度、實現夢想。',
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
    icon: '/favion.png',
    shortcut: '/favion.png',
    apple: '/icons/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/logo.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/logo.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/logo.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/logo.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/icons/logo.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/icons/logo.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/logo.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/icons/logo.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/icons/logo.png" />
        <link rel="icon" href="/favion.png" />
        <link rel="shortcut icon" href="/favion.png" />
        <meta name="theme-color" content="#0891b2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Meet The Future" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Meet The Future" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-gray-50 dark:bg-gray-900 font-sans theme-transition`}
        suppressHydrationWarning={true}
      >
        <GoogleAnalytics />
        <ThemeProvider>
          <Providers>
            <AlertProvider>
              <ScrollToTop />
              <Navigation/>
              <main className="min-h-screen pt-16">{children}</main>
            </AlertProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
