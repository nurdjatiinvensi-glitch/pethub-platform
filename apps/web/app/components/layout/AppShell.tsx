import type { ReactNode } from "react";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import MobileNavigation from "./MobileNavigation";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#F8FAF9] text-gray-900">
      <AppHeader />

      <div className="flex min-h-0 flex-1">
        <AppSidebar />

        <div className="main-scrollbar-hide min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain">
          <main className="min-h-full">{children}</main>

          <footer className="hidden border-t border-gray-100 bg-white px-5 py-4 lg:block">
            <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
              <p>© {new Date().getFullYear()} PetHub.id</p>
              <p>Teman terbaik untuk setiap langkah bersama hewanmu.</p>
            </div>
          </footer>
        </div>
      </div>

      <MobileNavigation />
    </div>
  );
}
