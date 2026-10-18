import Image from "next/image";
import Link from "next/link";
import AppIcon from "../ui/AppIcon";

const articles = [
  {
    id: 1,
    category: "Kesehatan",
    title: "Tips menjaga kesehatan hewan kesayangan di rumah",
    excerpt:
      "Kenali rutinitas sederhana yang dapat membantu menjaga kesehatan dan kenyamanan hewanmu.",
    date: "Edukasi Perawatan",
    image:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=85",
    href: "#artikel",
  },
  {
    id: 2,
    category: "Nutrisi",
    title: "Memilih makanan yang tepat untuk hewan peliharaan",
    excerpt:
      "Pahami kebutuhan nutrisi sesuai usia, ukuran tubuh, dan kondisi hewan kesayanganmu.",
    date: "Panduan Nutrisi",
    image:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=85",
    href: "#artikel",
  },
  {
    id: 3,
    category: "Perawatan",
    title: "Membangun rutinitas grooming yang nyaman",
    excerpt:
      "Pelajari cara merawat kebersihan bulu dan membiasakan hewan dengan proses grooming.",
    date: "Tips Perawatan",
    image:
      "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=85",
    href: "#artikel",
  },
];

export default function ArticleSection() {
  return (
    <section
      id="artikel"
      aria-labelledby="articles-heading"
      className="py-4 sm:py-5"
    >
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2F7D4A]">
            Belajar bersama PetHub
          </p>

          <h2
            id="articles-heading"
            className="mt-1 text-lg font-semibold tracking-tight text-gray-900 sm:text-xl"
          >
            Artikel & edukasi
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Informasi untuk membantu sahabatmu tumbuh sehat dan bahagia.
          </p>
        </div>

        <Link
          href="#artikel"
          className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-[#2F7D4A] hover:text-[#276A3F] sm:inline-flex"
        >
          Semua artikel
          <AppIcon name="arrow-right" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.id}
            className="group overflow-hidden rounded-xl border border-gray-100 bg-white transition-all hover:shadow-md"
          >
            <Link
              href={article.href}
              aria-label={`Baca artikel: ${article.title}`}
              className="relative block aspect-[16/10] overflow-hidden bg-gray-50"
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1280px) 45vw, 30vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>

            <div className="p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#EEF7F1] px-3 py-1 text-xs font-medium text-[#2F7D4A]">
                  {article.category}
                </span>

                <span className="text-[11px] text-gray-400">
                  {article.date}
                </span>
              </div>

              <Link href={article.href} className="block">
                <h3 className="mt-2 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-gray-900 transition-colors group-hover:text-[#2F7D4A]">
                  {article.title}
                </h3>
              </Link>

              <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                {article.excerpt}
              </p>

              <Link
                href={article.href}
                className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#2F7D4A] hover:text-[#276A3F]"
              >
                Baca selengkapnya
                <AppIcon name="arrow-right" size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
