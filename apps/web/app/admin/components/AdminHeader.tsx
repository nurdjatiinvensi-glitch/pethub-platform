"use client";

import AppIcon from "../../components/ui/AppIcon";

export default function AdminHeader({
  onOpenMobile,
}: {
  onOpenMobile: () => void;
}) {
  return (
    <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-gray-100 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          aria-label="Open navigation"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
        >
          <AppIcon name="menu" size={21} />
        </button>

        <div>
          <p className="text-sm font-semibold text-gray-800">Admin Portal</p>
          <p className="hidden text-xs text-gray-400 sm:block">
            PetHub Platform Management
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
        >
          <AppIcon name="bell" size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#F28C28]" />
        </button>

        <div className="flex items-center gap-2 border-l border-gray-100 pl-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF7F1] text-[#2F7D4A]">
            <AppIcon name="user" size={18} />
          </div>

          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-800">Administrator</p>
            <p className="text-[11px] text-gray-400">Platform Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
