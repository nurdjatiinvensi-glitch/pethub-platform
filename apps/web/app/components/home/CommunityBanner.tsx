import Link from "next/link";
import AppIcon from "../ui/AppIcon";

export default function CommunityBanner() {
  return (
    <section
      id="komunitas"
      aria-labelledby="community-heading"
      className="py-4 sm:py-5"
    >
      <div className="relative overflow-hidden rounded-2xl border border-[#E5EFE8] bg-[#F8FAF9] px-4 py-5 sm:px-6 sm:py-6">
        <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#EEF7F1]" />
        <div className="pointer-events-none absolute -bottom-20 right-40 h-48 w-48 rounded-full border-[30px] border-[#EEF7F1]/80" />

        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#2F7D4A] shadow-sm">
              <AppIcon name="users" size={15} />
              Komunitas PetHub
            </span>

            <h2
              id="community-heading"
              className="mt-3 text-xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-2xl"
            >
              Berbagi cerita,
              <span className="block text-[#2F7D4A]">tumbuh bersama.</span>
            </h2>

            <p className="mt-2 max-w-lg text-xs leading-5 text-gray-600 sm:text-sm">
              Bertemu sesama pecinta hewan, berbagi pengalaman, dan saling
              belajar untuk memberikan perawatan terbaik bagi sahabat kita.
            </p>

            <Link
              href="#komunitas"
              className="mt-4 inline-flex min-h-9 items-center justify-center gap-2 rounded-lg bg-[#2F7D4A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#276A3F]"
            >
              Jelajahi Komunitas
              <AppIcon name="arrow-right" size={17} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:w-[280px] md:shrink-0">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF7F1] text-[#2F7D4A]">
                <AppIcon name="users" size={21} />
              </span>

              <p className="mt-4 text-sm font-semibold text-gray-900">
                Saling terhubung
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Berbagi dengan sesama pemilik hewan.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-4 sm:mt-8 sm:p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#F28C28]">
                <AppIcon name="heart" size={21} />
              </span>

              <p className="mt-4 text-sm font-semibold text-gray-900">
                Saling peduli
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Belajar merawat dengan lebih baik.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
