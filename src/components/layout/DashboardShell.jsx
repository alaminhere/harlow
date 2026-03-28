'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

export default function DashboardShell({ children }) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen">
      <aside
        onClick={() => setOpen(prev => !prev)}
        className={` fixed md:static top-0 left-0  z-10 h-screen w-full md:max-w-60 border-r border-r-border  bg-transparent transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 `}
      >
        <DashboardSidebar session={session} setOpen={setOpen} />
      </aside>
      <main className="flex-1 flex flex-col h-screen overflow-hidden z-0">
        <DashboardNavbar open={open} setOpen={setOpen} />
        <div className="flex-1 overflow-y-auto scrollbar-none p-5">
          {children}
        </div>
      </main>
    </div>
  );
}
