'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { FiHome, FiSettings, FiTarget, FiLogOut, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 fixed w-full z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                  Meet The Future
                </span>
              </div>
            </div>
            
            {/* 桌面版選單 */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-8">
                <Link
                scroll={true}
                  href="/"
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === '/'
                      ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiHome className="mr-2 h-4 w-4" />
                  首頁
                </Link>

                {session && (
                  <>
                    <Link
                    scroll={true}
                      href="/dashboard"
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        pathname === '/dashboard'
                          ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/50'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <FiTarget className="mr-2 h-4 w-4" />
                      目標追蹤
                    </Link>
                    
                    <Link
                    scroll={true}
                      href="/admin"
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        pathname.startsWith('/admin')
                          ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/50'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <FiSettings className="mr-2 h-4 w-4" />
                      後台管理
                    </Link>
                  </>
                )}
              </div>

              {/* 登入狀態顯示 */}
              <div className="flex items-center space-x-4 border-l dark:border-gray-600 pl-4">
                {status === 'loading' ? (
                  <div className="text-sm text-gray-500 dark:text-gray-400">載入中...</div>
                ) : session ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {session.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || '用戶'}
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <FiUser className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {session.user?.name}
                      </span>
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      <FiLogOut className="mr-2 h-4 w-4" />
                      登出
                    </button>
                  </div>
                ) : (
                  <Link
                  scroll={true}
                    href="/auth/signin"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors"
                  >
                    <FiUser className="mr-2 h-4 w-4" />
                    登入
                  </Link>
                )}
              </div>
            </div>

            {/* 手機版漢堡選單按鈕 */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                aria-expanded="false"
              >
                <span className="sr-only">打開主選單</span>
                {isMenuOpen ? (
                  <FiX className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <FiMenu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 手機版選單 */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
              <Link
              scroll={true}
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                  pathname === '/'
                    ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <FiHome className="mr-3 h-5 w-5" />
                  首頁
                </div>
              </Link>

              {session && (
                <>
                  <Link
                  scroll={true}
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      pathname === '/dashboard'
                        ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <FiTarget className="mr-3 h-5 w-5" />
                      目標追蹤
                    </div>
                  </Link>
                  
                  <Link
                  scroll={true}
                    href="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      pathname.startsWith('/admin')
                        ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <FiSettings className="mr-3 h-5 w-5" />
                      後台管理
                    </div>
                  </Link>
                </>
              )}
            </div>

            {/* 手機版登入狀態 */}
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-600">
              <div className="px-2 space-y-1">
                {status === 'loading' ? (
                  <div className="px-3 py-2 text-base font-medium text-gray-500 dark:text-gray-400">載入中...</div>
                ) : session ? (
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-3 mb-3">
                      {session.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || '用戶'}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FiUser className="h-6 w-6 text-blue-600" />
                        </div>
                      )}
                      <div>
                        <div className="text-base font-medium text-gray-800 dark:text-gray-200">{session.user?.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{session.user?.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      <FiLogOut className="mr-3 h-5 w-5" />
                      登出
                    </button>
                  </div>
                ) : (
                  <Link
                  scroll={true}
                    href="/auth/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md transition-colors"
                  >
                    <div className="flex items-center">
                      <FiUser className="mr-3 h-5 w-5" />
                      登入
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
