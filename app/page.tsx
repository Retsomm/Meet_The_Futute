'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import StructuredData from './components/StructuredData';

type TabType = 'present' | 'future';

const ArrowIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block align-[-2px]"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const Home = () => {
  const [tab, setTab] = useState<TabType>('present');
  const rootRef = useRef<HTMLDivElement>(null);
  const { status } = useSession();
  const ctaHref = status === 'authenticated' ? '/admin' : '/auth/signin';

  useEffect(() => {
    let mounted = true;
    let ctx: { revert?: () => void } = {};

    const heroSelectors = '.hero-eyebrow, .hero-title, .hero-lede, .hero-cta-item, .hero-meta-item';

    const showHeroFallback = () => {
      if (!rootRef.current) return;
      rootRef.current.querySelectorAll<HTMLElement>(heroSelectors).forEach(el => {
        el.style.opacity = '1';
        el.style.transform = '';
      });
    };

    // Safety net: if GSAP takes too long on slow network, reveal content anyway
    const fallbackTimer = window.setTimeout(showHeroFallback, 900);

    const initGSAP = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');

        if (!mounted || !rootRef.current) {
          clearTimeout(fallbackTimer);
          return;
        }

        clearTimeout(fallbackTimer);
        gsap.registerPlugin(ScrollTrigger);
        const root = rootRef.current;

        ctx = gsap.context(() => {
          const ent = (sel: string, opts: { y?: number; duration?: number; delay?: number; stagger?: number } = {}) => {
            const els = root.querySelectorAll(sel);
            if (!els.length) return;
            gsap.fromTo(els,
              { y: opts.y ?? 18, opacity: 0 },
              { y: 0, opacity: 1, duration: opts.duration ?? 0.8, delay: opts.delay ?? 0, ease: 'power3.out', stagger: opts.stagger ?? 0, clearProps: 'transform' }
            );
          };
          ent('.hero-eyebrow', { y: 12, duration: 0.6 });
          ent('.hero-title', { y: 28, duration: 0.9, delay: 0.05 });
          ent('.hero-lede', { y: 16, duration: 0.8, delay: 0.2 });
          ent('.hero-cta-item', { y: 12, duration: 0.7, delay: 0.35, stagger: 0.08 });
          ent('.hero-meta-item', { y: 10, duration: 0.6, delay: 0.5, stagger: 0.08 });

          gsap.to('.hero-title', {
            yPercent: -8, ease: 'none',
            scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 0.6 }
          });
          gsap.to('.hero-lede', {
            yPercent: -16, ease: 'none',
            scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 0.6 }
          });

          gsap.from('.twocol-item', {
            y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: '.twocol-section', start: 'top 78%', toggleActions: 'play none none reverse' }
          });

          gsap.from('.quote-text', {
            y: 30, opacity: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '.quote-section', start: 'top 75%', toggleActions: 'play none none reverse' }
          });
          gsap.from('.quote-open', {
            scale: 0.4, opacity: 0, duration: 0.8, delay: 0.1, ease: 'back.out(2)', transformOrigin: 'left bottom',
            scrollTrigger: { trigger: '.quote-section', start: 'top 75%', toggleActions: 'play none none reverse' }
          });
          gsap.from('.quote-attr', {
            opacity: 0, x: -20, duration: 0.7, delay: 0.4, ease: 'power2.out',
            scrollTrigger: { trigger: '.quote-section', start: 'top 75%', toggleActions: 'play none none reverse' }
          });

          gsap.from('.continuity-head > *', {
            y: 24, opacity: 0, duration: 0.8, ease: 'power2.out', stagger: 0.08,
            scrollTrigger: { trigger: '.continuity-section', start: 'top 75%', toggleActions: 'play none none reverse' }
          });
          gsap.from('.tabs-bar', {
            y: 16, opacity: 0, duration: 0.7, delay: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: '.continuity-section', start: 'top 75%', toggleActions: 'play none none reverse' }
          });
          gsap.from('.panel-grid', {
            y: 30, opacity: 0, duration: 0.9, delay: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.panel-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
          });

          gsap.from('.features-head > *', {
            y: 24, opacity: 0, duration: 0.8, ease: 'power2.out', stagger: 0.08,
            scrollTrigger: { trigger: '.features-section', start: 'top 75%', toggleActions: 'play none none reverse' }
          });
          gsap.from('.feature-card', {
            y: 50, opacity: 0, scale: 0.96, duration: 0.9, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: '.features-grid', start: 'top 82%', toggleActions: 'play none none reverse' }
          });

          gsap.from('.cta-title', {
            y: 36, opacity: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '.cta-section', start: 'top 75%', toggleActions: 'play none none reverse' }
          });
          gsap.from('.cta-sub, .cta-btn', {
            y: 18, opacity: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1, delay: 0.2,
            scrollTrigger: { trigger: '.cta-section', start: 'top 75%', toggleActions: 'play none none reverse' }
          });
          gsap.from('.footer-bar', {
            opacity: 0, duration: 0.8, ease: 'power1.out',
            scrollTrigger: { trigger: '.footer-bar', start: 'top 95%', toggleActions: 'play none none reverse' }
          });

          root.querySelectorAll<HTMLElement>('.feature-card, .twocol-item').forEach(el => {
            el.addEventListener('mouseenter', () => gsap.to(el, { y: -3, duration: 0.3, ease: 'power2.out' }));
            el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, duration: 0.3, ease: 'power2.out' }));
          });

          if (document.fonts?.ready) {
            document.fonts.ready.then(() => ScrollTrigger.refresh());
          }
        }, root);
      } catch {
        // GSAP failed to load — show content without animation
        showHeroFallback();
      }
    };

    void initGSAP();
    return () => {
      mounted = false;
      clearTimeout(fallbackTimer);
      if (ctx.revert) ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef}>
      <StructuredData data={{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Meet The Future' }} />

      {/* HERO */}
      <section className="hero-section py-16 md:py-24">
        <div className="max-w-narrow mx-auto px-6">
          <span className="hero-eyebrow opacity-0 font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            Personal growth, quantified
          </span>
          <h1 className="hero-title opacity-0 font-serif font-medium text-[clamp(40px,7vw,88px)] leading-[1.05] tracking-[-0.025em] mt-[22px] text-ink">
            遇見<br />未來的<em className="not-italic font-medium text-accent italic">自己</em>。
          </h1>
          <p className="hero-lede opacity-0 font-serif font-normal text-[17px] md:text-[20px] leading-[1.55] text-ink-2 max-w-[560px] mt-5 md:mt-6">
            把抽象的成長，變成可以追蹤的軌跡。設定目標、量化差距、與更好的自己對話 —
            為每一位對未來有憧憬的人類而設計。
          </p>
          <div className="flex gap-2.5 mt-7 md:mt-8 flex-wrap">
            <Link
              href={ctaHref}
              className="hero-cta-item opacity-0 inline-flex items-center gap-2 px-5 py-3 bg-accent text-accent-ink rounded-lg font-medium text-[14.5px] hover:brightness-95 transition-all border border-transparent"
            >
              立即開始 <ArrowIcon size={14} />
            </Link>
            <Link
              href="/about"
              className="hero-cta-item opacity-0 inline-flex items-center gap-2 px-5 py-3 bg-surface text-ink border border-ink-3 shadow-ds rounded-lg font-medium text-[14.5px] hover:bg-bg-2 hover:border-ink transition-all"
            >
              了解更多 →
            </Link>
          </div>
          <div className="flex gap-6 md:gap-10 mt-8 md:mt-10 flex-wrap">
            <div className="hero-meta-item opacity-0">
              <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-3">Method</div>
              <div className="font-serif text-[18px] md:text-[22px] text-ink mt-1">Future-self continuity</div>
            </div>
            <div className="hero-meta-item opacity-0">
              <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-3">Built for</div>
              <div className="font-serif text-[18px] md:text-[22px] text-ink mt-1">深度自省者</div>
            </div>
            <div className="hero-meta-item opacity-0">
              <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-3">Format</div>
              <div className="font-serif text-[18px] md:text-[22px] text-ink mt-1">每日 5 分鐘</div>
            </div>
          </div>
        </div>
      </section>

      {/* TWO-COL */}
      <section className="twocol-section grid grid-cols-1 md:grid-cols-2 border-t border-line border-b">
        <div className="twocol-item p-8 md:p-14">
          <div className="font-mono text-[12px] text-ink-3 tracking-[0.12em]">01 — 起點</div>
          <h3 className="font-serif text-[24px] md:text-[28px] font-medium tracking-[-0.015em] mt-4 mb-3">
            現在的<em className="italic text-ink-3">自己</em>
          </h3>
          <p className="text-ink-2 leading-[1.65] text-[15px] m-0">
            認識並接納當下 — 你目前的能力、習慣、處境。這不是一份檢討清單，而是一張誠實的座標圖。所有改變都從這裡出發。
          </p>
        </div>
        <div className="twocol-item p-8 md:p-14 border-t border-line md:border-t-0 md:border-l">
          <div className="font-mono text-[12px] text-ink-3 tracking-[0.12em]">02 — 終點</div>
          <h3 className="font-serif text-[24px] md:text-[28px] font-medium tracking-[-0.015em] mt-4 mb-3">
            未來的<em className="italic text-accent">自己</em>
          </h3>
          <p className="text-ink-2 leading-[1.65] text-[15px] m-0">
            描繪你想成為的樣子，越具體越好。研究顯示：當未來的自己變得鮮明、可感，今天的拖延就會少一點，行動就會多一點。
          </p>
        </div>
      </section>

      {/* QUOTE */}
      <section className="quote-section py-24 bg-bg-2 border-t border-line border-b">
        <div className="max-w-narrow mx-auto px-6">
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3">Research note</p>
          <blockquote className="quote-text font-serif text-[clamp(24px,3vw,32px)] leading-[1.45] text-ink font-normal tracking-[-0.01em] mt-6">
            <span className="quote-open font-serif text-[1.6em] leading-none text-accent mr-1 align-[-0.1em] inline-block">&ldquo;</span>
            你愈是把自己視為陌生人，就愈有可能把相當於給陌生人的工作份量，丟給未來的自己；
            也愈有可能把事情拖到明天 — 留給未來的自己去做。
          </blockquote>
          <div className="quote-attr font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 mt-8 flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-ink-3" />
            Hal Hershfield · The future you
          </div>
        </div>
      </section>

      {/* CONTINUITY TABS */}
      <section className="continuity-section py-24">
        <div className="max-w-narrow mx-auto px-6">
          <div className="continuity-head mb-8">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3">未來自我延續性</p>
            <h2 className="font-serif text-[clamp(32px,4vw,44px)] font-medium tracking-[-0.02em] mt-3 mb-4 text-ink">
              在連結之前，先<em className="italic">看見</em>彼此。
            </h2>
            <p className="text-ink-2 text-[16px] leading-[1.65] max-w-[600px]">
              左欄是現在，右欄是未來。你可以隨時切換視角 — 觀察兩者之間的距離，也是在縮短這個距離的開始。
            </p>
          </div>
          <div className="tabs-bar flex gap-1 p-1 bg-bg-2 border border-line rounded-d w-fit mb-6">
            <button
              onClick={() => setTab('present')}
              className={`px-4 py-2 rounded-ds font-medium text-[14px] transition-all ${
                tab === 'present'
                  ? 'bg-surface text-ink shadow-ds'
                  : 'text-ink-3 hover:text-ink-2'
              }`}
            >
              現在的我
            </button>
            <button
              onClick={() => setTab('future')}
              className={`px-4 py-2 rounded-ds font-medium text-[14px] transition-all ${
                tab === 'future'
                  ? 'bg-surface text-ink shadow-ds'
                  : 'text-ink-3 hover:text-ink-2'
              }`}
            >
              未來的我
            </button>
          </div>
          <div className="panel-grid grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line rounded-dl overflow-hidden mt-6">
            {tab === 'present' ? (
              <>
                <div className="bg-surface p-6 md:p-10">
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3">Snapshot</p>
                  <h3 className="font-serif text-[22px] md:text-[28px] font-medium mt-3 tracking-[-0.015em]">現在的自己</h3>
                  <p className="text-ink-2 mt-3 leading-[1.65] text-[15px]">目前的能力、習慣、知識水平與生活狀態。這是一個誠實但不嚴苛的快照。</p>
                </div>
                <div className="bg-surface p-6 md:p-10">
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3">Common patterns</p>
                  <ul className="list-none p-0 mt-4">
                    {['容易拖延，傾向把任務留給「未來的自己」', '對未來自己缺乏連結感，視為「陌生人」', '缺乏明確的長期目標和行動計畫'].map((t, i) => (
                      <li
                        key={i}
                        className={`flex gap-3 py-3 text-[14px] text-ink-2 leading-[1.55] ${i !== 0 ? 'border-t border-line' : ''}`}
                      >
                        <span className="font-mono text-[11px] text-ink-3 min-w-[24px] pt-0.5 shrink-0">0{i + 1}</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="bg-surface p-6 md:p-10">
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3">Vision</p>
                  <h3 className="font-serif text-[22px] md:text-[28px] font-medium mt-3 tracking-[-0.015em] text-accent">未來的自己</h3>
                  <p className="text-ink-2 mt-3 leading-[1.65] text-[15px]">理想中更好、更具生產力的版本 — 不必完美，但必須具體。</p>
                </div>
                <div className="bg-surface p-6 md:p-10">
                  <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3">What changes</p>
                  <ul className="list-none p-0 mt-4">
                    {['更高的能力和專業技能，並能持續複利', '更好的生活品質、人際關係與內在秩序', '達成重要的人生目標，並開始設定下一個'].map((t, i) => (
                      <li
                        key={i}
                        className={`flex gap-3 py-3 text-[14px] text-ink-2 leading-[1.55] ${i !== 0 ? 'border-t border-line' : ''}`}
                      >
                        <span className="font-mono text-[11px] text-ink-3 min-w-[24px] pt-0.5 shrink-0">0{i + 1}</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section py-16 md:py-24 bg-bg-2 border-t border-line border-b">
        <div className="max-w-narrow mx-auto px-6">
          <div className="features-head mb-8 md:mb-10">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3">系統功能</p>
            <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-medium tracking-[-0.02em] mt-3 text-ink">
              三個工具，串起<em className="italic">現在</em>與<em className="italic text-accent">未來</em>。
            </h2>
          </div>
          <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-10">
            {[
              { num: '01 / 03', title: '目標設定', desc: '明確定義現在與未來的自己，設定具體可達成的階段性目標 — 並把它們拆解成可以勾選的子任務。' },
              { num: '02 / 03', title: '進度追蹤', desc: '量化你與未來自己的差距，每完成一個子目標都會縮小百分比。看得見的進步，是最強的動機。' },
              { num: '03 / 03', title: '自我連結', desc: '透過視覺化對比，加強現在與未來自己的連結感，減少拖延、提高行動力 — 與你的未來建立關係。' },
            ].map((f) => (
              <div
                key={f.num}
                className="feature-card bg-surface border border-line rounded-dl shadow-ds p-6 md:p-7"
              >
                <div className="font-mono text-[11px] tracking-[0.12em] text-ink-3">{f.num}</div>
                <h3 className="font-serif text-[20px] md:text-[22px] font-medium tracking-[-0.01em] mt-6 md:mt-9 mb-2">{f.title}</h3>
                <p className="text-ink-2 text-[14px] leading-[1.6] m-0">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-20 md:py-[120px] text-center">
        <div className="max-w-narrow mx-auto px-6">
          <h2 className="cta-title font-serif text-[clamp(40px,5vw,56px)] font-medium tracking-[-0.02em] m-0 text-ink">
            開始你的<em className="cta-sub italic text-accent">成長之旅</em>。
          </h2>
          <p className="cta-sub text-ink-2 text-[17px] leading-[1.6] max-w-[480px] mx-auto mt-5 mb-8">
            減少拖延、提高生產力、加速個人成長 — 一次一個子目標。
          </p>
          <div className="flex gap-2.5 justify-center flex-wrap">
            <Link
              href={ctaHref}
              className="cta-btn inline-flex items-center gap-2 px-5 py-3 bg-accent text-accent-ink rounded-lg font-medium text-[14.5px] hover:brightness-95 transition-all border border-transparent"
            >
              立即開始 <ArrowIcon size={14} />
            </Link>
            <Link
              href="/admin"
              className="cta-btn inline-flex items-center gap-2 px-5 py-3 bg-surface text-ink border border-ink-3 shadow-ds rounded-lg font-medium text-[14.5px] hover:bg-bg-2 hover:border-ink transition-all"
            >
              管理目標
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer-bar border-t border-line py-8">
        <div className="max-w-container mx-auto px-6">
          <div className="flex justify-between items-center gap-6 text-[13px] text-ink-3 flex-wrap">
            <div className="font-mono">© 2026 · Meet The Future</div>
            <div className="font-mono">為每一位對未來有憧憬的人類而設計</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
