import Link from "next/link";
import AppIcon from "../ui/AppIcon";

export default function FeedCareBanner() {
  return (
    <section aria-labelledby="feedcare-heading" className="py-3">
      <div className="relative overflow-hidden rounded-2xl bg-[#2F7D4A] px-4 py-5 text-white sm:px-5 sm:py-6">
        <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border-[35px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-20 right-32 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white">
              <AppIcon name="heart" size={15} />
              Program kepedulian PetHub
            </span>

            <h2
              id="feedcare-heading"
              className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Beli Makanannya.
              <span className="block text-white/85">Bantu Berikan.</span>
            </h2>

            <p className="mt-2 max-w-lg text-xs leading-5 text-white/80 sm:text-sm">
              Ikut membantu menyediakan makanan untuk hewan terlantar. Setiap
              penyaluran didukung dokumentasi dan laporan kontribusi.
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#2F7D4A]">
                <AppIcon name="heart" size={24} />
              </span>

              <div>
                <p className="text-sm font-semibold">FeedCare</p>
                <p className="mt-1 text-xs text-white/75">
                  Small Meals. Big Impact.
                </p>
              </div>
            </div>

            <Link
              href="/feedcare"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#2F7D4A] transition-colors hover:bg-[#EEF7F1]"
            >
              Jelajahi FeedCare
              <AppIcon name="arrow-right" size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
