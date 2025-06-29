'use client';

import { useState } from 'react';

export default function TwitterDebugPage() {
  const [debugInfo, setDebugInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const testTwitterConfig = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug/twitter-config');
      const data = await response.json();
      setDebugInfo(data);
    } catch (error) {
      setDebugInfo({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Twitter OAuth 診斷工具</h1>
          
          <button
            onClick={testTwitterConfig}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? '檢查中...' : '檢查 Twitter 配置'}
          </button>

          {debugInfo && (
            <div className="mt-8 bg-black/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">診斷結果</h2>
              <pre className="text-green-300 text-sm overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-8 bg-white/5 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">常見問題檢查清單</h2>
            <div className="space-y-3 text-gray-200">
              <div className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <div>
                  <strong>Twitter App Type:</strong> 確保您的 Twitter 應用是 &quot;Web App&quot; 類型
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <div>
                  <strong>OAuth 2.0 設定:</strong> 確保已啟用 OAuth 2.0 並設定正確的 Callback URL
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <div>
                  <strong>App Permissions:</strong> 設定為 &quot;Read&quot; 權限即可
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <div>
                  <strong>Callback URL:</strong> 必須是 <code className="bg-black/30 px-2 py-1 rounded">http://localhost:3000/api/auth/callback/twitter</code>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <div>
                  <strong>Website URL:</strong> 設定為 <code className="bg-black/30 px-2 py-1 rounded">http://localhost:3000</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
