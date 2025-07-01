'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { FiUser, FiTarget, FiTrendingUp, FiArrowRight, FiHeart, FiClock, FiStar, FiUsers } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 註冊GSAP插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [currentTab, setCurrentTab] = useState('present');
  const { data: session } = useSession();
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // 清理之前的ScrollTrigger實例
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // 頁面載入動畫
    const tl = gsap.timeline();
    
    // Hero section 動畫
    tl.fromTo(heroRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // 為每個section添加滾動觸發動畫
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(section,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // 卡片懸浮動畫
    const cards = document.querySelectorAll('.hover-card');
    cards.forEach(card => {
      gsap.set(card, { transformOrigin: "center center" });
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power2.out" });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-teal-800">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              遇見未來的
              <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
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
              scroll={true}
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <FiTarget className="mr-2 h-5 w-5" />
                查看我的目標
                <FiArrowRight className="ml-2 h-5 w-5" />
              </Link>
            ) : (
              <Link
              scroll={true}
                href="/auth/signin"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <FiUser className="mr-2 h-5 w-5" />
                立即開始
                <FiArrowRight className="ml-2 h-5 w-5" />
              </Link>
            )}
            <Link
            scroll={true}
              href="/about"
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20"
            >
              了解更多
            </Link>
          </div>

          {/* 核心理念卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="hover-card bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-left">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-6">
                <FiUser className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">現在的自己</h3>
              <p className="text-gray-200 leading-relaxed">
                認識並接納當下的自己，清楚了解現在的能力、狀態和處境。這是成長的起點，也是所有改變的基礎。
              </p>
            </div>

            <div className="hover-card bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-left">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center mb-6">
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
      <section ref={addToRefs} className="py-16 px-4 bg-white/5 backdrop-blur">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">核心理念</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto rounded-full"></div>
          </div>

          <div className="hover-card bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 md:p-12">
            <blockquote className="text-lg md:text-xl text-gray-200 leading-relaxed italic text-center">
              「你愈是把自己視為陌生人，你就愈有可能把相當於給陌生人的工作份量，丟給未來的自己；
              你也就愈有可能把事情拖到明天──留給未來的自己去做。」
            </blockquote>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl border border-cyan-400/20">
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
      <section ref={addToRefs} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">未來自我延續性</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              在你跟未來的自己取得聯繫之前，先了解你們之間的連結程度
            </p>
          </div>

          <div className="hover-card bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8">
            <div className="mb-8">
              <div className="flex justify-center space-x-4 mb-6">
                <button
                  onClick={() => setCurrentTab('present')}
                  className={`px-6 py-3 rounded-full transition-all ${
                    currentTab === 'present'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-white/10 text-gray-200 hover:bg-white/20'
                  }`}
                >
                  現在的我
                </button>
                <button
                  onClick={() => setCurrentTab('future')}
                  className={`px-6 py-3 rounded-full transition-all ${
                    currentTab === 'future'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
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
                        <FiClock className="h-5 w-5 mt-1 mr-3 text-cyan-400" />
                        容易拖延，傾向把任務留給「未來的自己」
                      </li>
                      <li className="flex items-start">
                        <FiUser className="h-5 w-5 mt-1 mr-3 text-cyan-400" />
                        對未來自己缺乏連結感，視為「陌生人」
                      </li>
                      <li className="flex items-start">
                        <FiTarget className="h-5 w-5 mt-1 mr-3 text-cyan-400" />
                        缺乏明確的長期目標和行動計畫
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
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
                        <FiTrendingUp className="h-5 w-5 mt-1 mr-3 text-cyan-400" />
                        更高的能力和專業技能
                      </li>
                      <li className="flex items-start">
                        <FiHeart className="h-5 w-5 mt-1 mr-3 text-cyan-400" />
                        更好的生活品質和人際關係
                      </li>
                      <li className="flex items-start">
                        <FiTarget className="h-5 w-5 mt-1 mr-3 text-cyan-400" />
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
      <section ref={addToRefs} className="py-16 px-4 bg-white/5 backdrop-blur">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">系統功能</h2>
            <p className="text-xl text-gray-200">
              透過可視化工具連結現在與未來的自己
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="hover-card bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <FiTarget className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">目標設定</h3>
              <p className="text-gray-200">
                明確定義現在的自己與未來的自己，設定具體可達成的階段性目標
              </p>
            </div>

            <div className="hover-card bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <FiTrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">進度追蹤</h3>
              <p className="text-gray-200">
                量化你與未來自己的差距，透過完成子目標逐步縮小差距
              </p>
            </div>

            <div className="hover-card bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center">
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
      <section ref={addToRefs} className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            開始你的成長之旅
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            減少拖延，提高生產力，加速個人成長的速度
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link
            scroll={true}
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <FiTarget className="mr-2 h-5 w-5" />
              立即開始
              <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
            scroll={true}
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