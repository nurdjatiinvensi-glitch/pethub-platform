import Image from "next/image";
import Link from "next/link";
import AppIcon from "../ui/AppIcon";

const products = [
  {
    id: 1,
    name: "Makanan Anjing Premium",
    category: "Makanan Hewan",
    price: "Rp125.000",
    rating: "4.9",
    reviews: "120 ulasan",
    image:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=600&q=85",
    badge: "Terlaris",
  },
  {
    id: 2,
    name: "Tempat Tidur Nyaman",
    category: "Aksesori",
    price: "Rp189.000",
    rating: "4.8",
    reviews: "86 ulasan",
    image:
      "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=600&q=85",
    badge: "Pilihan",
  },
  {
    id: 3,
    name: "Mainan Hewan Interaktif",
    category: "Mainan",
    price: "Rp59.000",
    rating: "4.8",
    reviews: "64 ulasan",
    image:
      "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=600&q=85",
    badge: null,
  },
  {
    id: 4,
    name: "Perlengkapan Grooming",
    category: "Perawatan",
    price: "Rp79.000",
    rating: "4.7",
    reviews: "52 ulasan",
    image:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=85",
    badge: null,
  },
];

export default function FeaturedProducts() {
  return (
    <section
      id="produk"
      aria-labelledby="products-heading"
      className="py-4 sm:py-5"
    >
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2F7D4A]">
            Pilihan untuk sahabatmu
          </p>

          <h2
            id="products-heading"
            className="mt-1 text-lg font-semibold tracking-tight text-gray-900 sm:text-xl"
          >
            Produk unggulan
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Temukan kebutuhan favorit hewan kesayanganmu.
          </p>
        </div>

        <Link
          href="#produk"
          className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-[#2F7D4A] hover:text-[#276A3F] sm:inline-flex"
        >
          Lihat semua
          <AppIcon name="arrow-right" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="group min-w-0 overflow-hidden rounded-xl border border-gray-100 bg-white transition-all hover:shadow-md"
          >
            <Link
              href="#produk"
              aria-label={`Lihat ${product.name}`}
              className="relative block aspect-square overflow-hidden bg-gray-50"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 46vw, (max-width: 1280px) 45vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {product.badge && (
                <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#2F7D4A] shadow-sm sm:text-xs">
                  {product.badge}
                </span>
              )}
            </Link>

            <div className="p-2.5 sm:p-3">
              <p className="text-[10px] text-gray-400 sm:text-xs">
                {product.category}
              </p>

              <Link href="#produk" className="block">
                <h3 className="mt-1 line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-gray-900 transition-colors group-hover:text-[#2F7D4A] sm:text-sm">
                  {product.name}
                </h3>
              </Link>

              <p className="mt-2 text-sm font-semibold text-[#2F7D4A] sm:text-base">
                {product.price}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] text-gray-500 sm:text-xs">
                <AppIcon name="sparkles" size={13} />
                <span className="font-medium text-gray-700">
                  {product.rating}
                </span>
                <span>·</span>
                <span>{product.reviews}</span>
              </div>

              <Link
                href="#produk"
                className="mt-3 flex min-h-8 w-full items-center justify-center gap-2 rounded-lg border border-[#2F7D4A]/20 px-2 py-1.5 text-xs font-semibold text-[#2F7D4A] transition-colors hover:bg-[#2F7D4A] hover:text-white"
              >
                Lihat Produk
                <AppIcon name="chevron-right" size={15} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <Link
        href="#produk"
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 sm:hidden"
      >
        Lihat semua produk
        <AppIcon name="arrow-right" size={16} />
      </Link>
    </section>
  );
}
