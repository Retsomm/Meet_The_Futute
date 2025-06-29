'use client';

import Link from 'next/link';
import { FiArrowLeft, FiTarget, FiTrendingUp, FiHeart, FiUsers, FiClock, FiStar } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* 返回按鈕 */}
      <div className="pt-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            返回首頁
          </Link>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 標題 */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              關於
              <span className="bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
                未來自我延續性
              </span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              深入了解如何與未來的自己建立更緊密的連結
            </p>
          </div>

          {/* 核心概念 */}
          <section className="mb-16">
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">核心理念</h2>
              
              <div className="space-y-8">
                <div className="border-l-4 border-pink-400 pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">陌生人效應</h3>
                  <p className="text-gray-200 leading-relaxed">
                    當我們把未來的自己視為陌生人時，就容易把困難的工作推給「未來的自己」處理。
                    這種心態會導致拖延，因為我們對未來自己缺乏同理心。
                  </p>
                </div>

                <div className="border-l-4 border-purple-400 pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">生產力激勵</h3>
                  <p className="text-gray-200 leading-relaxed">
                    研究證實，只要把未來的自己想像成更好、更具生產力的版本，
                    就能激勵現在的你做出對未來有益的行為。這種想像能夠創造正向的行為改變。
                  </p>
                </div>

                <div className="border-l-4 border-blue-400 pl-6">
                  <h3 className="text-xl font-semibold text-white mb-3">公平性原則</h3>
                  <p className="text-gray-200 leading-relaxed">
                    當我們拖延或浪費時間時，實際上是對未來的自己不公平。
                    認知到這點能幫助我們建立更負責任的行為模式。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 未來自我延續性量表 */}
          <section className="mb-16">
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                未來自我延續性測評
              </h2>
              
              <p className="text-gray-200 text-center mb-8">
                每個人認同未來自我的程度不一。以下量表可以幫助你了解自己與未來自己的連結程度：
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-400/20 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                      <FiClock className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">低連結度（0-3分）</h3>
                  </div>
                  <p className="text-gray-200">
                    你很難想像未來的自己，傾向於把困難的任務推遲到明天。
                    未來對你來說是模糊且遙遠的概念。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-400/20 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                      <FiUsers className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">中等連結度（4-6分）</h3>
                  </div>
                  <p className="text-gray-200">
                    你對未來的自己有一定的認知，但連結感還不夠強烈。
                    有時會為未來考慮，但仍會有拖延的傾向。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-400/20 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <FiStar className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">高連結度（7-10分）</h3>
                  </div>
                  <p className="text-gray-200">
                    你與未來的自己有強烈的連結感，會積極為未來做準備。
                    你把未來的自己視為重要的夥伴，而非陌生人。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 系統如何幫助你 */}
          <section className="mb-16">
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                系統如何幫助你建立連結
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <FiTarget className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">具體化目標</h3>
                      <p className="text-gray-200">
                        透過詳細描述現在與未來的自己，讓抽象的概念變得具體可感
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <FiTrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">量化進度</h3>
                      <p className="text-gray-200">
                        通過子目標的完成，量化你與未來自己的差距縮小程度
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <FiHeart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">情感連結</h3>
                      <p className="text-gray-200">
                        透過視覺化工具和進度追蹤，加強與未來自己的情感連結
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <FiUsers className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">持續提醒</h3>
                      <p className="text-gray-200">
                        定期回顧和更新，保持與未來自己的持續對話
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 預期效果 */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 border border-pink-400/20 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">預期效果</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FiClock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">減少拖延</h3>
                  <p className="text-gray-200">
                    強化與未來自己的連結，減少把任務推給「未來自己」的傾向
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FiTrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">提高生產力</h3>
                  <p className="text-gray-200">
                    明確的目標和進度追蹤，讓你更有動力完成重要任務
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FiStar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">加速成長</h3>
                  <p className="text-gray-200">
                    持續的自我對話和目標追蹤，加速個人成長的速度
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              準備好與未來的自己建立連結了嗎？
            </h2>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <FiTarget className="mr-2 h-5 w-5" />
              開始你的成長之旅
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
