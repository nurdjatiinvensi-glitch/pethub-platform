"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AppIcon from "../ui/AppIcon";

const menuItems = [
  { label: "Beranda", icon: "home", href: "/" },
  { label: "Produk", icon: "shopping-bag", href: "#produk" },
  { label: "FeedCare", icon: "heart", href: "/feedcare" },
  { label: "Komunitas", icon: "users", href: "#komunitas" },
  { label: "Akun", icon: "user", href: "/akun" },
] as const;

export default function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-100 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto flex h-[68px] max-w-lg items-center justify-around">
        {menuItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : item.href === "/feedcare"
                ? pathname.startsWith("/feedcare")
                : false;

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 transition-colors ${
                isActive
                  ? "text-[#2F7D4A]"
                  : "text-gray-400 hover:text-[#2F7D4A]"
              }`}
            >
              <AppIcon name={item.icon} size={21} />

              <span
                className={`text-[10px] ${
                  isActive ? "font-semibold" : "font-medium"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
