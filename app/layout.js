import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Providers from "./components/Providers";
import { AlertProvider } from "./components/Alert";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./components/ThemeProvider";

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
  title: "Meet The Future",
  description: "追蹤你與未來自己的差距，量化你的成長進度",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-gray-50 dark:bg-gray-900 font-sans transition-colors`}
        suppressHydrationWarning={true}
      >
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
