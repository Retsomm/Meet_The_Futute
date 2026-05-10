'use client';

import type { ReactNode } from 'react';
import { SupabaseProvider } from './SupabaseProvider';

export default function Providers({ children }: { children: ReactNode }) {
  return <SupabaseProvider>{children}</SupabaseProvider>;
}
