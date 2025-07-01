'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function TestAuthPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">認證測試頁面</h1>
          
          {/* 當前認證狀態 */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">當前認證狀態</h2>
            <div className="space-y-2">
              <p><strong>Status:</strong> <span className="text-blue-600">{status}</span></p>
              <p><strong>Session exists:</strong> <span className="text-blue-600">{session ? 'Yes' : 'No'}</span></p>
              {session && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                  <p><strong>用戶名:</strong> {session.user?.name}</p>
                  <p><strong>Email:</strong> {session.user?.email}</p>
                  <p><strong>Provider:</strong> {session.user?.provider || 'Unknown'}</p>
                </div>
              )}
            </div>
          </div>

          {/* 登錄按鈕 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">登錄測試</h2>
            {!session ? (
              <div className="space-y-4">
                <button
                  onClick={() => signIn('google')}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg mr-4"
                >
                  使用 Google 登錄
                </button>
                <button
                  onClick={() => signIn('github')}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg mr-4"
                >
                  使用 GitHub 登錄
                </button>
                <button
                  onClick={() => signIn('twitter')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg mr-4"
                >
                  使用 Twitter 登錄
                </button>
                <button
                  onClick={() => signIn()}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
                >
                  顯示所有登錄選項
                </button>
              </div>
            ) : (
              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
              >
                登出
              </button>
            )}
          </div>

          {/* 調試信息 */}
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">調試信息</h2>
            <div className="text-sm space-y-1">
              <p><strong>當前 URL:</strong> {typeof window !== 'undefined' ? window.location.origin : 'Server Side'}</p>
              <p><strong>預期回調 URL:</strong> http://localhost:3000/api/auth/callback/twitter</p>
              <p><strong>NextAuth URL:</strong> {process.env.NEXTAUTH_URL || 'Not set'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
