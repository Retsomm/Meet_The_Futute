'use client';

import { useAuth } from './SupabaseProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/auth/signin');
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-line border-t-accent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-ink-3 font-mono text-[12px] tracking-[0.1em]">LOADING</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <p className="text-ink-2 text-[14px]">正在跳轉到登入頁面...</p>
      </div>
    );
  }

  return <>{children}</>;
}
