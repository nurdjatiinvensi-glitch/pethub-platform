"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AppIcon from "../../components/ui/AppIcon";
import PetHubLogo from "../../components/ui/PetHubLogo";

export default function AdminSidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const isItemsActive = pathname.startsWith("/admin/items");
  const isCategoriesActive = pathname.startsWith("/admin/categories");

  const linkClass = (active: boolean) =>
    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors ${
      active
        ? "bg-[#EEF7F1] font-semibold text-[#2F7D4A]"
        : "font-medium text-gray-600 hover:bg-gray-50 hover:text-[#2F7D4A]"
    }`;

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[250px] shrink-0
          flex-col bg-white shadow-[4px_0_12px_rgba(15,23,42,0.06)]
          transition-transform duration-200
          lg:static lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex h-[72px] shrink-0 items-center border-b border-gray-100 px-6">
          <PetHubLogo href="/admin" iconSize={25} textSize="md" />
        </div>

        {/* Navigation */}
        <div className="sidebar-scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-6">
          <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
            Platform Management
          </p>

          <nav aria-label="Admin navigation" className="space-y-1">
            <Link
              href="/admin"
              onClick={onClose}
              className={linkClass(pathname === "/admin")}
            >
              <AppIcon name="home" size={19} />
              <span>Dashboard</span>
            </Link>

            <p className="mb-3 mt-7 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
              Ecosystem
            </p>

            <div className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-gray-700">
              <AppIcon name="shopping-bag" size={19} />
              <span>Marketplace</span>
            </div>

            <Link
              href="/admin/items"
              onClick={onClose}
              className={`ml-3 ${linkClass(isItemsActive)}`}
            >
              <AppIcon name="package" size={18} />
              <span>Items</span>
            </Link>
            <Link
              href="/admin/categories"
              onClick={onClose}
              className={`ml-3 ${linkClass(isCategoriesActive)}`}
            >
              <AppIcon name="package" size={18} />
              <span>Categories</span>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="shrink-0 bg-white px-6 py-4">
          <p className="text-xs text-gray-400">
            PetHub.id
            <span className="mx-1.5">·</span>
            Platform Administration
          </p>
        </div>
      </aside>
    </>
  );
}
