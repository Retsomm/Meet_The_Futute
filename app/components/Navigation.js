'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { FiHome, FiSettings, FiTarget, FiLogOut, FiUser } from 'react-icons/fi';
import SessionDebug from './SessionDebug';

export default function Navigation() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  console.log('Navigation render:', { session, status }); // 添加調試日誌

  return (
    <>
      <SessionDebug />
      <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <FiTarget className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                個人成長管理
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === '/'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiHome className="mr-2 h-4 w-4" />
                首頁
              </Link>

              {session && (
                <>
                  <Link
                    href="/dashboard"
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      pathname === '/dashboard'
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <FiTarget className="mr-2 h-4 w-4" />
                    目標追蹤
                  </Link>
                  
                  <Link
                    href="/admin"
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      pathname.startsWith('/admin')
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <FiSettings className="mr-2 h-4 w-4" />
                    後台管理
                  </Link>
                </>
              )}
            </div>

            {/* 登入狀態顯示 */}
            <div className="flex items-center space-x-4 border-l pl-4">
              {status === 'loading' ? (
                <div className="text-sm text-gray-500">載入中...</div>
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
                    <span className="text-sm font-medium text-gray-700">
                      {session.user?.name}
                    </span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <FiLogOut className="mr-2 h-4 w-4" />
                    登出
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  <FiUser className="mr-2 h-4 w-4" />
                  登入
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}
