'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiAlertCircle, FiHome } from 'react-icons/fi';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error) => {
    switch (error) {
      case 'Configuration':
        return '伺服器配置錯誤，請聯繫管理員。';
      case 'AccessDenied':
        return '訪問被拒絕，您沒有權限訪問此資源。';
      case 'Verification':
        return '驗證失敗，請重新嘗試登入。';
      case 'Default':
        return '登入過程中發生錯誤，請重新嘗試。';
      default:
        return '發生未知錯誤，請重新嘗試登入。';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <FiAlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">登入失敗</h1>
          <p className="text-gray-600 mb-6">
            {getErrorMessage(error)}
          </p>
          <div className="space-y-3">
            <Link
            scroll={true}
              href="/auth/signin"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors inline-block text-center"
            >
              重新登入
            </Link>
            <Link
            scroll={true}
              href="/"
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors inline-flex items-center justify-center"
            >
              <FiHome className="mr-2 h-4 w-4" />
              回到首頁
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">載入中...</p>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
