'use client';

import { getProviders, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { FiMail, FiGithub, FiTwitter } from 'react-icons/fi';
import Link from 'next/link';

export default function SignIn() {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const getProviderIcon = (providerId) => {
    switch (providerId) {
      case 'google':
        return <FiMail className="h-5 w-5" />;
      case 'github':
        return <FiGithub className="h-5 w-5" />;
      case 'twitter':
        return <FiTwitter className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getProviderColor = (providerId) => {
    switch (providerId) {
      case 'google':
        return 'bg-red-600 hover:bg-red-700';
      case 'github':
        return 'bg-gray-800 hover:bg-gray-900';
      case 'twitter':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const getProviderName = (providerId) => {
    switch (providerId) {
      case 'google':
        return 'Google';
      case 'github':
        return 'GitHub';
      case 'twitter':
        return 'X (Twitter)';
      default:
        return providerId;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-cyan-900 dark:via-blue-900 dark:to-teal-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-md w-full">
        <div className="bg-white/80 dark:bg-white/10 backdrop-blur border border-gray-200 dark:border-white/20 rounded-2xl p-8 transition-colors">
          {/* 標題 */}
          <div className="text-center mb-8">
            <Link scroll={true} href="/" className="inline-block mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                遇見未來的自己
              </h1>
            </Link>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 transition-colors">
              歡迎回來
            </h2>
            <p className="text-gray-600 dark:text-gray-200 transition-colors">
              登入來追蹤你的成長目標
            </p>
          </div>

          {/* 登入提供者 */}
          <div className="space-y-4">
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id, { callbackUrl: '/dashboard' })}
                  className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white transition-colors ${getProviderColor(
                    provider.id
                  )}`}
                >
                  {getProviderIcon(provider.id)}
                  <span className="ml-3">
                    使用 {getProviderName(provider.id)} 登入
                  </span>
                </button>
              ))}
          </div>

          {/* 說明文字 */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-300">
              登入即表示您同意我們的服務條款和隱私政策
            </p>
          </div>

          {/* 返回首頁 */}
          <div className="mt-6 text-center">
            <Link
            scroll={true}
              href="/"
              className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
            >
              ← 返回首頁
            </Link>
          </div>
        </div>

        {/* 功能說明 */}
        <div className="mt-8 bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">為什麼需要登入？</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              保護你的個人目標和進度資料
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              在不同裝置間同步你的成長軌跡
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              確保只有你能訪問和管理你的目標
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
