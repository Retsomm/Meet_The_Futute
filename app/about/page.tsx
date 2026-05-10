'use client';

import Link from 'next/link';
import { useRef, useLayoutEffect } from 'react';

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

const AboutPage = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx: { revert?: () => void } = {};

    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!rootRef.current) return;
      const root = rootRef.current;

      ctx = gsap.context(() => {
        gsap.from('.about-back-link', { x: -10, opacity: 0, duration: 0.6, ease: 'power2.out' });
        gsap.from('.about-eyebrow', { y: 14, opacity: 0, duration: 0.7, delay: 0.05, ease: 'power2.out' });
        gsap.from('.about-title', { y: 30, opacity: 0, duration: 1, delay: 0.1, ease: 'power3.out' });
        gsap.from('.about-lede', { y: 18, opacity: 0, duration: 0.8, delay: 0.25, ease: 'power2.out' });

        gsap.from('.book-quote-d', {
          y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.book-quote-d', start: 'top 80%', toggleActions: 'play none none reverse' }
        });
        gsap.from('.book-quote-open', {
          scale: 0.4, opacity: 0, duration: 0.8, delay: 0.2, ease: 'back.out(2)', transformOrigin: 'left top',
          scrollTrigger: { trigger: '.book-quote-d', start: 'top 80%', toggleActions: 'play none none reverse' }
        });

        gsap.from('.principle-d', {
          y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.principles-d', start: 'top 80%', toggleActions: 'play none none reverse' }
        });

        gsap.from('.scale-card-d', {
          y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.scale-row-d', start: 'top 80%', toggleActions: 'play none none reverse' }
        });
        gsap.from('.scale-bar-d', {
          scaleX: 0, duration: 1.1, ease: 'power3.out', stagger: 0.1, transformOrigin: 'left',
          scrollTrigger: { trigger: '.scale-row-d', start: 'top 75%', toggleActions: 'play none none reverse' }
        });

        gsap.from('.help-card-d', {
          y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: '.help-grid-d', start: 'top 82%', toggleActions: 'play none none reverse' }
        });

        gsap.from('.outcome-d', {
          y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.outcomes-d', start: 'top 80%', toggleActions: 'play none none reverse' }
        });
        root.querySelectorAll<HTMLElement>('.stat-num-d').forEach(el => {
          const target = parseInt(el.dataset.value ?? '0', 10);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target, duration: 1.4, ease: 'power2.out',
            onUpdate: () => { if (el.firstChild) el.firstChild.nodeValue = String(Math.round(obj.v)); },
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
          });
        });

        gsap.from('.about-cta-item', {
          y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.about-cta-section', start: 'top 82%', toggleActions: 'play none none reverse' }
        });

        if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
      }, root);
    };

    void initGSAP();
    return () => { if (ctx.revert) ctx.revert(); };
  }, []);

  return (
    <div ref={rootRef}>
      {/* HERO */}
      <section className="pt-20 pb-14 text-center">
        <div className="max-w-narrow mx-auto px-6">
          <Link
            href="/"
            className="about-back-link inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-ink-3 px-3 py-2 rounded-ds transition-all duration-150"
          >
            ← 返回首頁
          </Link>
          <p className="about-eyebrow font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 m-0 mt-6">
            關於這個系統
          </p>
          <h1 className="about-title font-serif text-[clamp(44px,6vw,72px)] font-medium tracking-[-0.025em] mt-4 leading-[1.05]">
            關於<em className="italic text-accent not-italic font-medium">未來自我延續性</em>
          </h1>
          <p className="about-lede font-serif text-lg text-ink-2 max-w-[540px] mx-auto mt-5 leading-relaxed">
            深入了解如何與未來的自己建立更緊密的連結 — 以及為什麼這件事如此重要。
          </p>
        </div>
      </section>

      {/* BOOK QUOTE */}
      <section className="py-20">
        <div className="max-w-narrow mx-auto px-6">
          <div className="text-center mb-8">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 m-0">Inspiration</p>
            <h2 className="font-serif text-[40px] font-medium tracking-[-0.02em] mt-2 mb-0">靈感來源</h2>
          </div>
          <div className="book-quote-d p-14 border border-line rounded-dl bg-surface relative">
            <span className="book-quote-open absolute top-6 left-8 font-serif text-[96px] leading-none text-accent opacity-40 pointer-events-none">
              &ldquo;
            </span>
            <p className="font-serif text-[22px] leading-[1.55] text-ink relative pl-6 border-l border-accent m-0">
              當我們能夠清楚地預見未來的自己時，就能夠做出更明智的決策、減少拖延，並且更有動力去實現我們的目標。
            </p>
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 mt-8 flex items-center gap-3">
              <span className="w-6 h-px bg-ink-3 inline-block" />
              <span className="font-serif italic normal-case tracking-normal text-[13px] text-ink-2">《最有生產力的一年》</span>
            </div>
          </div>
          <p className="text-center text-ink-2 text-[15px] leading-[1.7] mt-8 max-w-[640px] mx-auto">
            這個系統的核心理念源自於克里斯・貝利在書中提出的概念。透過與未來自己建立更緊密的連結，
            我們可以克服拖延症、提高工作效率，並為長期目標做出更好的決策。
          </p>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="py-20 bg-bg-2 border-t border-line border-b border-line">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-10">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 m-0">Core principles</p>
            <h2 className="font-serif text-[40px] font-medium tracking-[-0.02em] mt-2 mb-0">核心理念</h2>
            <p className="text-ink-2 text-base leading-relaxed mt-3 mx-auto max-w-[560px]">
              三個被研究反覆驗證的觀察，定義了這個系統的設計方向。
            </p>
          </div>
          <div className="principles-d grid grid-cols-1 md:grid-cols-3 border border-line rounded-dl bg-surface overflow-hidden">
            {[
              { num: 'PRINCIPLE 01', title: '陌生人效應', desc: '當我們把未來的自己視為陌生人時，就容易把困難的工作推給「未來的自己」處理。這種心態會導致拖延，因為我們對未來自己缺乏同理心。' },
              { num: 'PRINCIPLE 02', title: '生產力激勵', desc: '研究證實，只要把未來的自己想像成更好、更具生產力的版本，就能激勵現在的你做出對未來有益的行為 — 想像力創造行為改變。' },
              { num: 'PRINCIPLE 03', title: '公平性原則', desc: '當我們拖延或浪費時間時，實際上是對未來的自己不公平。認知到這點能幫助我們建立更負責任的行為模式。' },
            ].map((p, i) => (
              <div key={i} className="principle-d p-9 border-l border-line first:border-l-0">
                <div className="font-mono text-[11px] tracking-[0.14em] text-accent">{p.num}</div>
                <h3 className="font-serif text-2xl font-medium tracking-[-0.015em] mt-6 mb-3">{p.title}</h3>
                <p className="text-ink-2 text-[14.5px] leading-[1.65] m-0">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCALE */}
      <section className="py-20">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-2">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 m-0">Self-assessment</p>
            <h2 className="font-serif text-[40px] font-medium tracking-[-0.02em] mt-2 mb-0">未來自我延續性測評</h2>
            <p className="text-ink-2 text-base leading-relaxed mt-3 mx-auto max-w-[560px]">
              每個人認同未來自我的程度不一。以下量表可以幫助你了解自己與未來自己的連結程度。
            </p>
          </div>
          <div className="scale-row-d grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { range: 'SCORE 0 — 3', level: '低連結度', desc: '你很難想像未來的自己，傾向於把困難的任務推遲到明天。未來對你來說是模糊且遙遠的概念。', barW: 'w-[30%]', barColor: 'bg-ink-4' },
              { range: 'SCORE 4 — 6', level: '中等連結度', desc: '你對未來的自己有一定的認知，但連結感還不夠強烈。有時會為未來考慮，但仍會有拖延的傾向。', barW: 'w-[60%]', barColor: 'bg-warn' },
              { range: 'SCORE 7 — 10', level: '高連結度', desc: '你與未來的自己有強烈的連結感，會積極為未來做準備。把未來的自己視為重要的夥伴，而非陌生人。', barW: 'w-full', barColor: 'bg-accent' },
            ].map((s, i) => (
              <div key={i} className="scale-card-d p-7 border border-line rounded-dl bg-surface relative overflow-hidden">
                <div className={`scale-bar-d absolute left-0 top-0 h-[3px] ${s.barW} ${s.barColor}`} />
                <div className="font-mono text-[11px] tracking-[0.12em] text-ink-3">{s.range}</div>
                <div className="font-serif text-[26px] font-medium tracking-[-0.015em] mt-2">{s.level}</div>
                <div className="text-ink-2 text-sm leading-relaxed mt-3">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HELP GRID */}
      <section className="py-20 bg-bg-2 border-t border-line border-b border-line">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-2">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 m-0">How it helps</p>
            <h2 className="font-serif text-[40px] font-medium tracking-[-0.02em] mt-2 mb-0">系統如何幫助你建立連結</h2>
            <p className="text-ink-2 text-base leading-relaxed mt-3 mx-auto max-w-[560px]">
              四個工具，把抽象的概念變成可以實踐的日常。
            </p>
          </div>
          <div className="help-grid-d grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {[
              { num: '01', title: '具體化目標', desc: '透過詳細描述現在與未來的自己，讓抽象的概念變得具體可感 — 看得見、摸得到。' },
              { num: '02', title: '情感連結', desc: '透過視覺化工具和進度追蹤，加強與未來自己的情感連結 — 這不是冰冷的清單。' },
              { num: '03', title: '量化進度', desc: '透過子目標的完成，量化你與未來自己的差距 — 每一次勾選都是一次靠近。' },
              { num: '04', title: '持續提醒', desc: '定期回顧和更新，保持與未來自己的持續對話 — 關係需要被維護。' },
            ].map((h) => (
              <div key={h.num} className="help-card-d p-7 border border-line rounded-dl bg-surface flex gap-5 items-start">
                <div className="font-mono text-xs text-accent tracking-[0.12em] min-w-[28px] pt-1">{h.num}</div>
                <div>
                  <h4 className="font-serif text-[19px] font-medium tracking-[-0.01em] m-0">{h.title}</h4>
                  <p className="text-ink-2 text-sm leading-relaxed mt-2 mb-0">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-20">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center">
            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 m-0">Expected outcomes</p>
            <h2 className="font-serif text-[40px] font-medium tracking-[-0.02em] mt-2 mb-0">預期效果</h2>
            <p className="text-ink-2 text-base leading-relaxed mt-3 mx-auto max-w-[480px]">
              當你開始與未來的自己對話，這些事情會慢慢發生。
            </p>
          </div>
          <div className="outcomes-d grid grid-cols-1 md:grid-cols-3 border border-line rounded-dl bg-surface overflow-hidden mt-10">
            {[
              { value: 40, unit: '%', title: '減少拖延', desc: '強化與未來自己的連結，減少把任務推給「未來自己」的傾向。' },
              { value: 2, unit: '×', title: '提高生產力', desc: '明確的目標和進度追蹤，讓你更有動力完成重要任務。' },
              { value: 365, unit: 'days', title: '加速成長', desc: '持續的自我對話和目標追蹤，加速個人成長 — 一年的複利。' },
            ].map((o, i) => (
              <div key={i} className="outcome-d p-9 border-l border-line first:border-l-0 text-center">
                <div>
                  <span
                    className="stat-num-d font-serif text-[56px] font-medium leading-none tracking-[-0.025em] text-accent"
                    data-value={o.value}
                  >
                    0
                  </span>
                  <span className="font-mono text-sm text-ink-3 ml-1">{o.unit}</span>
                </div>
                <h4 className="font-serif text-xl font-medium mt-5 mb-2">{o.title}</h4>
                <p className="text-ink-2 text-[13.5px] leading-relaxed m-0">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section py-20 bg-bg-2 border-t border-line border-b border-line">
        <div className="max-w-narrow mx-auto px-6 text-center">
          <h2 className="about-cta-item font-serif text-[clamp(32px,4vw,48px)] font-medium tracking-[-0.02em] m-0">
            準備好與<em className="italic text-accent">未來的自己</em>建立連結了嗎？
          </h2>
          <p className="about-cta-item text-ink-2 text-base mt-5 max-w-[480px] mx-auto">
            從今天開始，每一個被勾選的子目標，都是一次向未來靠近。
          </p>
          <div className="about-cta-item flex gap-2.5 justify-center mt-8 flex-wrap">
            <Link href="/auth/signin" className="btn-d btn-primary-d btn-lg-d">
              開始你的成長之旅 <ArrowIcon size={14} />
            </Link>
            <Link href="/" className="btn-d btn-secondary-d btn-lg-d">返回首頁</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-line py-8">
        <div className="max-w-container mx-auto px-6">
          <div className="flex justify-between items-center gap-6 text-[13px] text-ink-3 flex-wrap">
            <div className="font-mono">© 2025 · Meet The Future</div>
            <div className="font-mono">為每一位對未來有憧憬的人類而設計</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
