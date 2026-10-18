import Link from "next/link";
import AppIcon from "../ui/AppIcon";

const menuItems = [
  { label: "Beranda", icon: "home", href: "/" },
  { label: "Produk", icon: "shopping-bag", href: "#produk" },
  { label: "Layanan", icon: "stethoscope", href: "#layanan" },
  { label: "FeedCare", icon: "heart", href: "/feedcare" },
  { label: "Komunitas", icon: "users", href: "#komunitas" },
  { label: "Artikel & Edukasi", icon: "book-open", href: "#artikel" },
  { label: "Event", icon: "calendar", href: "#event" },
] as const;

export default function AppSidebar() {
  return (
    <aside className="relative z-10 hidden h-full w-[250px] shrink-0 flex-col bg-white shadow-[4px_0_12px_rgba(15,23,42,0.06)] lg:flex">
      {/* AREA MENU: SCROLL TETAP AKTIF, SCROLLBAR DISEMBUNYIKAN */}
      <div className="sidebar-scrollbar-hide min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 py-6">
        <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
          Menu Utama
        </p>

        <nav aria-label="Navigasi utama" className="space-y-1">
          {menuItems.map((item) => {
            const isActive = item.href === "/";

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-[#EEF7F1] font-semibold text-[#2F7D4A]"
                    : "font-medium text-gray-600 hover:bg-gray-50 hover:text-[#2F7D4A]"
                }`}
              >
                <AppIcon name={item.icon} size={19} />
                <span>{item.label}</span>

                {item.label === "FeedCare" && (
                  <span className="ml-auto rounded-full bg-[#F28C28]/10 px-2 py-0.5 text-[10px] font-semibold text-[#F28C28]">
                    Baru
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* KARTU FEEDCARE */}
        <div className="mt-8 rounded-2xl bg-[#F8FAF9] p-4">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF7F1] text-[#2F7D4A]">
            <AppIcon name="heart" size={21} />
          </div>

          <h3 className="text-sm font-semibold text-gray-900">
            Rawat dengan lebih baik
          </h3>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            Bantu menyediakan makanan dan mendukung penyalurannya untuk
            hewan-hewan terlantar melalui FeedCare.
          </p>

          <Link
            href="/feedcare"
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#2F7D4A] transition-colors hover:text-[#276A3F]"
          >
            Buka FeedCare
            <AppIcon name="arrow-right" size={15} />
          </Link>
        </div>
      </div>

      {/* FOOTER SIDEBAR */}
      <div className="shrink-0 bg-white px-6 py-4">
        <p className="text-xs text-gray-400">
          PetHub.id
          <span className="mx-1.5">·</span>
          Teman terbaik hewanmu
        </p>
      </div>
    </aside>
  );
}
