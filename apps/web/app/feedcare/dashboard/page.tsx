import Link from "next/link";
import AppShell from "../../components/layout/AppShell";

const summaryItems = [
  {
    title: "Total Kontribusi",
    description: "Jumlah makanan yang telah kamu bantu sediakan",
  },
  {
    title: "Pesanan Aktif",
    description: "Pesanan yang masih dalam proses",
  },
  {
    title: "Menunggu Penyaluran",
    description: "Kontribusi yang belum selesai disalurkan",
  },
  {
    title: "Laporan Tersedia",
    description: "Dokumentasi penyaluran kontribusimu",
  },
];

export default function FeedCareDashboardPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] space-y-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        {/* PAGE HEADER */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/feedcare"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#2F7D4A] hover:text-[#276A3F]"
            >
              <span aria-hidden="true">←</span>
              Kembali ke FeedCare
            </Link>

            <p className="text-sm font-semibold text-[#2F7D4A]">
              FEEDCARE PERSONAL
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Dashboard Saya
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Pantau kontribusi makanan, pesanan, penyaluran, dan laporan
              kontribusimu untuk hewan-hewan terlantar.
            </p>
          </div>

          <Link
            href="/feedcare"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#2F7D4A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#276A3F]"
          >
            Lihat Paket Makanan
          </Link>
        </section>

        {/* PERSONAL SUMMARY */}
        <section aria-labelledby="summary-heading">
          <div className="mb-4">
            <h2
              id="summary-heading"
              className="text-lg font-bold text-gray-900"
            >
              Ringkasan Kontribusi
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Ringkasan aktivitas yang terhubung dengan kontribusimu.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summaryItems.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF7F1] text-[#2F7D4A]">
                  <span aria-hidden="true" className="text-lg">
                    {item.title === "Total Kontribusi"
                      ? "♡"
                      : item.title === "Pesanan Aktif"
                        ? "▤"
                        : item.title === "Menunggu Penyaluran"
                          ? "→"
                          : "✓"}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  {item.description}
                </p>

                <p className="mt-4 text-sm font-medium text-gray-400">
                  Data belum terhubung
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* PERSONAL ACTIVITY */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Aktivitas Saya
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Riwayat kontribusi dan perkembangan penyaluran.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-gray-200 bg-[#FAFBFA] px-5 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF7F1] text-2xl text-[#2F7D4A]">
              ♡
            </div>

            <h3 className="mt-4 text-base font-semibold text-gray-800">
              Aktivitas kontribusimu akan tampil di sini
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              Setelah data akun, pesanan, dan penyaluran terhubung, kamu dapat
              memantau perkembangan kontribusimu melalui halaman ini.
            </p>

            <Link
              href="/feedcare"
              className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl border border-[#2F7D4A] px-4 py-2 text-sm font-semibold text-[#2F7D4A] transition-colors hover:bg-[#EEF7F1]"
            >
              Jelajahi FeedCare
            </Link>
          </div>
        </section>

        {/* REPORT INFORMATION */}
        <section className="rounded-2xl bg-[#EEF7F1] p-5 sm:p-6">
          <h2 className="font-bold text-gray-900">Transparansi penyaluran</h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
            FeedCare membantu kontributor mengetahui perkembangan penyaluran
            makanan yang mereka dukung. Dokumentasi dan laporan akan ditampilkan
            sesuai data penyaluran yang tersedia.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
