'use client';

import Link from 'next/link';
import { getSupabase } from '../../../lib/supabase';

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" className="inline-block align-[-3px] shrink-0">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-[-3px] shrink-0">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

type Provider = 'google' | 'github';

const providers: { id: Provider; label: string; icon: React.ReactNode }[] = [
  { id: 'google', label: '使用 Google 繼續', icon: <GoogleIcon /> },
  { id: 'github', label: '使用 GitHub 繼續', icon: <GithubIcon /> },
];

const handleSignIn = async (provider: Provider) => {
  const sb = getSupabase();
  if (!sb) return;
  await sb.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
};

const SignIn = () => {
  return (
    <div className="min-h-[calc(100vh-60px)] grid grid-cols-1 md:grid-cols-2">
      {/* Left art panel */}
      <div className="bg-bg-2 border-r border-line relative p-14 hidden md:flex flex-col justify-between overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.4,
            maskImage: 'radial-gradient(circle at 30% 50%, #000 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at 30% 50%, #000 0%, transparent 70%)',
          }}
        />
        <div className="relative">
          <p className="eyebrow">A note before you sign in</p>
        </div>
        <div className="relative">
          <p className="font-serif text-[28px] leading-[1.4] text-ink tracking-[-0.01em] max-w-[440px] m-0">
            <em className="text-accent italic">&ldquo;</em>
            把未來的自己想像成更好、更具生產力的版本，足以激勵<em className="italic">現在的你</em>做出對未來自己有益的行為。
          </p>
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3 mt-8 flex items-center gap-3">
            <span className="w-6 h-px bg-ink-3 inline-block" />
            Future-self continuity research
          </div>
        </div>
        <div className="relative flex gap-6 text-[12px] text-ink-3 font-mono tracking-[0.06em]">
          <span>v 2.0</span>
          <span>·</span>
          <span>private by default</span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-[380px]">
          <p className="eyebrow">遇見未來的自己</p>
          <h1 className="font-serif text-[36px] font-medium tracking-[-0.02em] mt-3 mb-0">歡迎回來</h1>
          <p className="text-ink-2 mt-2 mb-8 text-[14px]">
            登入來追蹤你的成長目標 — 你的資料只屬於你。
          </p>

          <div className="flex flex-col gap-2">
            {providers.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => void handleSignIn(id)}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-surface border border-line-2 rounded-lg text-[14px] text-ink cursor-pointer transition-all shadow-ds hover:bg-bg-2"
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 my-5 text-ink-3 text-[12px] font-mono tracking-[0.1em]">
            <span className="flex-1 h-px bg-line" />
            OR
            <span className="flex-1 h-px bg-line" />
          </div>

          <Link href="/" className="btn-d btn-secondary-d w-full flex justify-center">
            ← 返回首頁
          </Link>

          <div className="text-[12px] text-ink-3 mt-7 leading-relaxed">
            登入即表示您同意我們的
            <a href="#" className="text-accent">服務條款</a>和
            <a href="#" className="text-accent">隱私政策</a>。
            <br />我們不會販售你的資料 — 也不會把你的目標寄給你媽。
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
