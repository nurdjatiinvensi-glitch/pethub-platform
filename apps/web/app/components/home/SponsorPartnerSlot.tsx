import Link from "next/link";
import AppIcon from "../ui/AppIcon";

type SponsorPartnerSlotProps = {
  title?: string;
  description?: string;
  size?: "compact" | "featured";
};

export default function SponsorPartnerSlot({
  title = "Ruang untuk Mitra PetHub",
  description = "Tempat untuk promosi brand, program sponsor, atau kolaborasi bersama perusahaan.",
  size = "compact",
}: SponsorPartnerSlotProps) {
  const featured = size === "featured";

  return (
    <aside
      aria-label="Slot iklan dan kerja sama"
      className={`relative flex flex-col overflow-hidden rounded-xl border border-dashed border-[#B8D8C2] bg-[#F6FBF7] ${
        featured ? "min-h-44 p-4 sm:p-5" : "min-h-32 p-3 sm:p-4"
      }`}
    >
      <span className="absolute right-3 top-3 rounded-full bg-white px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#2F7D4A] ring-1 ring-[#D8E9DD]">
        Iklan / Mitra
      </span>

      <div
        className={`flex items-center justify-center rounded-xl bg-white text-[#2F7D4A] ring-1 ring-[#E5EFE8] ${
          featured ? "mb-3 h-10 w-10" : "mb-2 h-9 w-9"
        }`}
      >
        <AppIcon name="users" size={featured ? 21 : 19} />
      </div>

      <h3 className="max-w-[85%] text-sm font-semibold text-gray-800">
        {title}
      </h3>
      <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>

      <Link
        href="#kerja-sama"
        className="mt-3 inline-flex w-fit items-center gap-1 text-xs font-semibold text-[#2F7D4A] transition-colors hover:text-[#276A3F]"
      >
        Peluang kerja sama
        <AppIcon name="arrow-right" size={14} />
      </Link>
    </aside>
  );
}
