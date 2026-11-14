"use client";

import { useState, type ReactNode } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#F8FAF9] text-gray-900">
      <div className="flex min-h-0 flex-1">
        <AdminSidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <AdminHeader onOpenMobile={() => setMobileOpen(true)} />

          <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
            <div className="mx-auto min-h-full w-full max-w-[1600px] p-5 sm:p-7">
              {children}
            </div>

            <footer className="border-t border-gray-100 bg-white px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
                <p>© {new Date().getFullYear()} PetHub.id</p>
                <p>Platform Administration</p>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
