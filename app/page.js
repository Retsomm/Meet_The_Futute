'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FiUser, FiTarget, FiTrendingUp, FiArrowRight, FiHeart, FiClock, FiStar, FiUsers } from 'react-icons/fi';

export default function Home() {
  const [currentTab, setCurrentTab] = useState('present');
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              遇見未來的
              <span className="bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
                自己
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              打造一個網站給每一位對未來有憧憬的人類
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
            {session ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <FiTarget className="mr-2 h-5 w-5" />
                查看我的目標
                <FiArrowRight className="ml-2 h-5 w-5" />
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <FiUser className="mr-2 h-5 w-5" />
                立即開始
                <FiArrowRight className="ml-2 h-5 w-5" />
              </Link>
            )}
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20"
            >
              了解更多
            </Link>
          </div>

          {/* 核心理念卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-left">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                <FiUser className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">現在的自己</h3>
              <p className="text-gray-200 leading-relaxed">
                認識並接納當下的自己，清楚了解現在的能力、狀態和處境。這是成長的起點，也是所有改變的基礎。
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-left">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-lg flex items-center justify-center mb-6">
                <FiStar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">未來的自己</h3>
              <p className="text-gray-200 leading-relaxed">
                想像並描繪理想中的自己，設定明確的目標和願景。這個未來的版本將成為你前進的動力和方向。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 引言區塊 */}
      <section className="py-16 px-4 bg-white/5 backdrop-blur">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">核心理念</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 md:p-12">
            <blockquote className="text-lg md:text-xl text-gray-200 leading-relaxed italic text-center">
              「你愈是把自己視為陌生人，你就愈有可能把相當於給陌生人的工作份量，丟給未來的自己；
              你也就愈有可能把事情拖到明天──留給未來的自己去做。」
            </blockquote>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-400/20">
              <p className="text-gray-200 leading-relaxed">
                <strong className="text-white">研究證實：</strong>
                你只需把未來的自己想像成更好的、更具生產力的版本，就足以激勵現在的你做出對未來自己有益的行為。
                當你拖延某件事或浪費時間時，可說是對未來的自己不公平。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 未來自我延續性概念 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">未來自我延續性</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              在你跟未來的自己取得聯繫之前，先了解你們之間的連結程度
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8">
            <div className="mb-8">
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  onClick={() => setCurrentTab('present')}
                  className={`px-6 py-3 rounded-full transition-all ${
                    currentTab === 'present'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                      : 'bg-white/10 text-gray-200 hover:bg-white/20'
                  }`}
                >
                  現在的我
                </button>
                <button
                  onClick={() => setCurrentTab('future')}
                  className={`px-6 py-3 rounded-full transition-all ${
                    currentTab === 'future'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                      : 'bg-white/10 text-gray-200 hover:bg-white/20'
                  }`}
                >
                  未來的我
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentTab === 'present' ? (
                <>
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <FiUser className="h-16 w-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">現在的自己</h3>
                    <p className="text-gray-200">
                      目前的能力、習慣、知識水平和生活狀態
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white">特徵：</h4>
                    <ul className="space-y-3 text-gray-200">
                      <li className="flex items-start">
                        <FiClock className="h-5 w-5 mt-1 mr-3 text-pink-400" />
                        容易拖延，傾向把任務留給「未來的自己」
                      </li>
                      <li className="flex items-start">
                        <FiUser className="h-5 w-5 mt-1 mr-3 text-pink-400" />
                        對未來自己缺乏連結感，視為「陌生人」
                      </li>
                      <li className="flex items-start">
                        <FiTarget className="h-5 w-5 mt-1 mr-3 text-pink-400" />
                        缺乏明確的長期目標和行動計畫
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <FiStar className="h-16 w-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">未來的自己</h3>
                    <p className="text-gray-200">
                      理想中更好、更具生產力的版本
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white">特徵：</h4>
                    <ul className="space-y-3 text-gray-200">
                      <li className="flex items-start">
                        <FiTrendingUp className="h-5 w-5 mt-1 mr-3 text-pink-400" />
                        更高的能力和專業技能
                      </li>
                      <li className="flex items-start">
                        <FiHeart className="h-5 w-5 mt-1 mr-3 text-pink-400" />
                        更好的生活品質和人際關係
                      </li>
                      <li className="flex items-start">
                        <FiTarget className="h-5 w-5 mt-1 mr-3 text-pink-400" />
                        達成重要的人生目標和夢想
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 系統功能介紹 */}
      <section className="py-16 px-4 bg-white/5 backdrop-blur">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">系統功能</h2>
            <p className="text-xl text-gray-200">
              透過可視化工具連結現在與未來的自己
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <FiTarget className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">目標設定</h3>
              <p className="text-gray-200">
                明確定義現在的自己與未來的自己，設定具體可達成的階段性目標
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <FiTrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">進度追蹤</h3>
              <p className="text-gray-200">
                量化你與未來自己的差距，透過完成子目標逐步縮小差距
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <FiUsers className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">自我連結</h3>
              <p className="text-gray-200">
                加強現在與未來自己的連結感，減少拖延並提高行動力
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            開始你的成長之旅
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            減少拖延，提高生產力，加速個人成長的速度
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <FiTarget className="mr-2 h-5 w-5" />
              立即開始
              <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20"
            >
              管理目標
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 遇見未來的自己 - 為每一位對未來有憧憬的人類而設計
          </p>
        </div>
      </footer>
    </div>
  );
}