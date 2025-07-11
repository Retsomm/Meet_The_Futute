'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { FiArrowLeft, FiTarget, FiTrendingUp, FiHeart, FiUsers, FiClock, FiStar } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 註冊GSAP插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-cyan-900 dark:via-blue-900 dark:to-teal-800 transition-colors">
      {/* 返回按鈕 */}
      <div className="pt-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
          scroll={true}
            href="/"
            className="inline-flex items-center text-gray-600 dark:text-white/70 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            返回首頁
          </Link>
        </div>
      </div>

      <div className="py-16 px-4 pb-32">
        <div className="max-w-4xl mx-auto">
          {/* 標題 */}
          <div ref={heroRef} className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
              關於
              <span className="bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                未來自我延續性
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-200 leading-relaxed">
              深入了解如何與未來的自己建立更緊密的連結
            </p>
          </div>

          {/* 引言 */}
          <section ref={addToRefs} className="mb-16">
            <div className="hover-card bg-white/90 dark:bg-white/10 backdrop-blur border border-gray-200 dark:border-white/20 rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-4">
                  <FiStar className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">靈感來源</h2>
              </div>
              
              <div className="bg-gradient-to-r from-amber-100 dark:from-amber-900/30 to-orange-100 dark:to-orange-900/30 border border-amber-300 dark:border-amber-400/30 rounded-xl p-6 md:p-8">
                <blockquote className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed text-center italic mb-6">
                  &ldquo;當我們能夠清楚地預見未來的自己時，就能夠做出更明智的決策，
                  減少拖延，並且更有動力去實現我們的目標。&rdquo;
                </blockquote>
                
                <div className="text-center">
                  <p className="text-gray-900 dark:text-white font-semibold mb-2">
                    —— 《最有生產力的一年》
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    第六章：預見未來的自己
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-200 text-center mt-6 leading-relaxed">
                這個系統的核心理念源自於克里斯·貝利在《最有生產力的一年》中提出的概念：
                通過與未來自己建立更緊密的連結，我們可以克服拖延症，提高工作效率，
                並為長期目標做出更好的決策。
              </p>
            </div>
          </section>

          {/* 核心概念 */}
          <section ref={addToRefs} className="mb-16">
            <div className="hover-card bg-white/90 dark:bg-white/10 backdrop-blur border border-gray-200 dark:border-white/20 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">核心理念</h2>
              
              <div className="space-y-8">
                <div className="border-l-4 border-cyan-400 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">陌生人效應</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    當我們把未來的自己視為陌生人時，就容易把困難的工作推給「未來的自己」處理。
                    這種心態會導致拖延，因為我們對未來自己缺乏同理心。
                  </p>
                </div>

                <div className="border-l-4 border-blue-400 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">生產力激勵</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    研究證實，只要把未來的自己想像成更好、更具生產力的版本，
                    就能激勵現在的你做出對未來有益的行為。這種想像能夠創造正向的行為改變。
                  </p>
                </div>

                <div className="border-l-4 border-teal-400 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">公平性原則</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    當我們拖延或浪費時間時，實際上是對未來的自己不公平。
                    認知到這點能幫助我們建立更負責任的行為模式。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 未來自我延續性量表 */}
          <section ref={addToRefs} className="mb-16">
            <div className="hover-card bg-white/90 dark:bg-white/10 backdrop-blur border border-gray-200 dark:border-white/20 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                未來自我延續性測評
              </h2>
              
              <p className="text-gray-700 dark:text-gray-200 text-center mb-8">
                每個人認同未來自我的程度不一。以下量表可以幫助你了解自己與未來自己的連結程度：
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-red-50 dark:from-red-900/30 to-orange-50 dark:to-orange-900/30 border border-red-200 dark:border-red-400/20 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                      <FiClock className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">低連結度（0-3分）</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200">
                    你很難想像未來的自己，傾向於把困難的任務推遲到明天。
                    未來對你來說是模糊且遙遠的概念。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 dark:from-yellow-900/30 to-orange-50 dark:to-orange-900/30 border border-yellow-200 dark:border-yellow-400/20 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                      <FiUsers className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">中等連結度（4-6分）</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200">
                    你對未來的自己有一定的認知，但連結感還不夠強烈。
                    有時會為未來考慮，但仍會有拖延的傾向。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 dark:from-green-900/30 to-cyan-50 dark:to-cyan-900/30 border border-green-200 dark:border-green-400/20 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <FiStar className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">高連結度（7-10分）</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200">
                    你與未來的自己有強烈的連結感，會積極為未來做準備。
                    你把未來的自己視為重要的夥伴，而非陌生人。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 系統如何幫助你 */}
          <section ref={addToRefs} className="mb-16">
            <div className="hover-card bg-white/90 dark:bg-white/10 backdrop-blur border border-gray-200 dark:border-white/20 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                系統如何幫助你建立連結
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <FiTarget className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">具體化目標</h3>
                      <p className="text-gray-700 dark:text-gray-200">
                        透過詳細描述現在與未來的自己，讓抽象的概念變得具體可感
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-teal-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <FiTrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">量化進度</h3>
                      <p className="text-gray-700 dark:text-gray-200">
                        通過子目標的完成，量化你與未來自己的差距縮小程度
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <FiHeart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">情感連結</h3>
                      <p className="text-gray-700 dark:text-gray-200">
                        透過視覺化工具和進度追蹤，加強與未來自己的情感連結
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <FiUsers className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">持續提醒</h3>
                      <p className="text-gray-700 dark:text-gray-200">
                        定期回顧和更新，保持與未來自己的持續對話
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 預期效果 */}
          <section ref={addToRefs} className="mb-16">
            <div className="bg-gradient-to-r from-cyan-50 dark:from-cyan-900/30 to-blue-50 dark:to-blue-900/30 border border-cyan-200 dark:border-cyan-400/20 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">預期效果</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FiClock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">減少拖延</h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    強化與未來自己的連結，減少把任務推給「未來自己」的傾向
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FiTrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">提高生產力</h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    明確的目標和進度追蹤，讓你更有動力完成重要任務
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FiStar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">加速成長</h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    持續的自我對話和目標追蹤，加速個人成長的速度
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div ref={addToRefs} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              準備好與未來的自己建立連結了嗎？
            </h2>
            <Link
            scroll={true}
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
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
