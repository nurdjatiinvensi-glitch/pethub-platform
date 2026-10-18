import Link from "next/link";
import AppIcon from "../ui/AppIcon";

const categories = [
  {
    title: "Makanan",
    description: "Nutrisi harian",
    icon: "utensils",
    href: "#produk",
    color: "bg-[#EEF7F1] text-[#2F7D4A]",
  },
  {
    title: "Aksesori",
    description: "Kebutuhan harian",
    icon: "shopping-bag",
    href: "#produk",
    color: "bg-orange-50 text-[#F28C28]",
  },
  {
    title: "Kesehatan",
    description: "Rawat dan lindungi",
    icon: "shield",
    href: "#layanan",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Grooming",
    description: "Bersih dan nyaman",
    icon: "sparkles",
    href: "#layanan",
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Klinik Hewan",
    description: "Perawatan profesional",
    icon: "stethoscope",
    href: "#layanan",
    color: "bg-rose-50 text-rose-600",
  },
  {
    title: "Adopsi",
    description: "Temukan sahabat",
    icon: "heart",
    href: "#komunitas",
    color: "bg-pink-50 text-pink-600",
  },
] as const;

export default function CategorySection() {
  return (
    <section aria-labelledby="category-heading" className="py-4 sm:py-5">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2F7D4A]">
            Jelajahi PetHub
          </p>

          <h2
            id="category-heading"
            className="mt-1 text-lg font-semibold tracking-tight text-gray-900 sm:text-xl"
          >
            Kebutuhan sahabatmu
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Temukan yang mereka butuhkan, semua dalam satu tempat.
          </p>
        </div>

        <Link
          href="#produk"
          className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-[#2F7D4A] hover:text-[#276A3F] sm:inline-flex"
        >
          Lihat semua
          <AppIcon name="chevron-right" size={17} />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3 xl:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group rounded-xl border border-gray-100 bg-white p-2.5 transition-all hover:border-[#2F7D4A]/30 hover:shadow-sm sm:p-3"
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${category.color} transition-transform group-hover:scale-105`}
            >
              <AppIcon name={category.icon} size={19} />
            </span>

            <h3 className="mt-2 text-xs font-semibold text-gray-900 sm:text-sm">
              {category.title}
            </h3>

            <p className="mt-0.5 hidden text-xs leading-4 text-gray-500 sm:block">
              {category.description}
            </p>

            <span className="mt-1 inline-flex items-center text-[#2F7D4A]">
              <AppIcon name="arrow-right" size={16} />
            </span>
          </Link>
        ))}
      </div>

      <Link
        href="#produk"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 sm:hidden"
      >
        Lihat semua kategori
        <AppIcon name="chevron-right" size={17} />
      </Link>
    </section>
  );
}
