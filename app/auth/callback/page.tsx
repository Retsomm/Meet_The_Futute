'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '../../../lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) { router.push('/'); return; }

    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      sb.auth.exchangeCodeForSession(code).then(() => {
        router.push('/dashboard');
      }).catch(() => {
        router.push('/auth/signin');
      });
    } else {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-line border-t-accent rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-ink-3 font-mono text-[12px] tracking-[0.1em]">登入中...</p>
      </div>
    </div>
  );
}
