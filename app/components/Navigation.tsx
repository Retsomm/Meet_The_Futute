'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';

const BrandMark = () => (
  <div
    className="w-[30px] h-[30px] rounded-lg grid place-items-center shrink-0 transition-colors duration-[250ms] ease-[ease]"
    style={{ background: 'var(--ink)' }}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="var(--bg)" strokeWidth="1.4" />
      <circle cx="15.5" cy="15.5" r="2.6" fill="var(--accent)" />
    </svg>
  </div>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const Navigation = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: '首頁' },
    ...(session ? [
      { href: '/dashboard', label: '儀表板' },
      { href: '/admin', label: '目標管理' },
    ] : []),
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav
      className="sticky top-0 z-40 border-b border-line backdrop-blur-md backdrop-saturate-150 bg-bg/90"
    >
      {/* Inner row */}
      <div className="flex items-center gap-2 px-4 md:px-6 h-14 max-w-screen-xl mx-auto">

        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-[10px] no-underline text-ink shrink-0"
          style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 17, letterSpacing: '-0.01em' }}
        >
          <BrandMark />
          <span>
            Meet The{' '}
            <em className="not-italic font-medium text-accent">Future</em>
          </span>
        </Link>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-1 ml-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 text-[13.5px] rounded-[7px] border-0 transition-all ${
                isActive(item.href)
                  ? 'text-ink bg-bg-2'
                  : 'text-ink-2 bg-transparent hover:bg-bg-2 hover:text-ink'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-1.5">

          {/* Theme toggle */}
          <button
            className="w-[34px] h-[34px] grid place-items-center bg-transparent border border-transparent rounded-lg text-ink-2 hover:bg-bg-2 hover:text-ink transition-all cursor-pointer"
            onClick={toggleTheme}
            title="切換主題"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2">
            {status === 'loading' ? (
              <Link
                href="/auth/signin"
                className="bg-surface text-ink border border-line shadow-ds hover:bg-bg-2 hover:border-ink px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 transition-all"
              >
                登入
              </Link>
            ) : session ? (
              <div className="flex items-center gap-2">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? '用戶'}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-accent-bg grid place-items-center">
                    <UserIcon />
                  </div>
                )}
                <button
                  onClick={() => void signOut()}
                  className="bg-transparent text-ink-2 hover:bg-bg-2 hover:text-ink px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all border border-transparent"
                >
                  登出
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-surface text-ink border border-line shadow-ds hover:bg-bg-2 hover:border-ink px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 transition-all"
              >
                登入
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="w-[34px] h-[34px] grid place-items-center bg-transparent border border-transparent rounded-lg text-ink-2 hover:bg-bg-2 hover:text-ink transition-all cursor-pointer md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="切換選單"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-line bg-bg px-4 pt-2 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-[15px] font-medium mb-0.5 transition-all ${
                isActive(item.href)
                  ? 'text-ink bg-bg-2'
                  : 'text-ink-2 bg-transparent hover:bg-bg-2 hover:text-ink'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t border-line mt-2 pt-3">
            {session ? (
              <button
                onClick={() => { void signOut(); setIsMenuOpen(false); }}
                className="w-full justify-center bg-transparent text-ink-2 hover:bg-bg-2 hover:text-ink px-3 py-1.5 rounded-lg text-sm font-medium transition-all border border-transparent"
              >
                登出
              </button>
            ) : (
              <Link
                href="/auth/signin"
                onClick={() => setIsMenuOpen(false)}
                className="flex justify-center w-full bg-accent text-accent-ink hover:brightness-95 px-4 py-2 rounded-lg text-sm font-medium border border-transparent items-center gap-2 transition-all"
              >
                登入
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
