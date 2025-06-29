'use client';

import { useSession } from 'next-auth/react';

export default function SessionDebug() {
  const { data: session, status } = useSession();

  return (
    <div className="fixed top-0 right-0 bg-black text-white p-4 z-50 text-xs">
      <div>Status: {status}</div>
      <div>Session: {session ? 'Yes' : 'No'}</div>
      {session && <div>User: {session.user?.name}</div>}
    </div>
  );
}
