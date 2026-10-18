import type { ReactNode } from "react";

type FeedCareContentProps = {
  children: ReactNode;
};

const summaryItems = [
  {
    title: "Total Kontribusi",
    description: "Jumlah kontribusi makanan dari seluruh kontributor.",
    icon: "heart-handshake",
  },
  {
    title: "Kontributor",
    description: "Orang yang berpartisipasi dalam program FeedCare.",
    icon: "users",
  },
  {
    title: "Sudah Disalurkan",
    description: "Kontribusi yang telah selesai disalurkan.",
    icon: "check-circle",
  },
  {
    title: "Dalam Proses",
    description: "Kontribusi yang sedang diproses untuk penyaluran.",
    icon: "truck",
  },
];

export default function FeedCareContent({ children }: FeedCareContentProps) {
  return (
    <div className="min-h-full bg-[#F8FAF9] text-gray-900">
      <div className="mx-auto max-w-[1600px] space-y-8 px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
        {/* PAGE HEADER */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>PetHub</span>
              <span aria-hidden="true">/</span>
              <span className="font-medium text-[#2F7D4A]">FeedCare</span>
            </div>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              FeedCare
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Pantau kontribusi, kenali para kontributor, dan pilih paket
              makanan untuk mendukung penyaluran kepada hewan terlantar.
            </p>
          </div>

          <a
            href="#paket"
            className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl bg-[#2F7D4A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#276A3F] sm:self-center"
          >
            <span>Pilih Paket Makanan</span>
            <span aria-hidden="true">→</span>
          </a>
        </section>

        {/* PROGRAM SUMMARY */}
        <section aria-labelledby="summary-heading">
          <div className="mb-4">
            <h2
              id="summary-heading"
              className="text-lg font-bold text-gray-900"
            >
              Ringkasan Program
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Informasi terkini mengenai aktivitas kontribusi FeedCare.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summaryItems.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-500">
                      {item.title}
                    </p>

                    <p className="mt-4 text-lg font-bold text-gray-400">
                      Data belum tersedia
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF7F1] text-[#2F7D4A]">
                    {item.icon === "heart-handshake" && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="h-5 w-5"
                      >
                        <path
                          d="M20.8 8.8c0 5.1-8.8 10-8.8 10s-8.8-4.9-8.8-10A4.8 4.8 0 0 1 12 6.4a4.8 4.8 0 0 1 8.8 2.4Z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="m8.5 11.5 2 2 5-5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}

                    {item.icon === "users" && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="h-5 w-5"
                      >
                        <circle cx="9" cy="8" r="3" />
                        <path
                          d="M3.5 19v-1.5a5.5 5.5 0 0 1 11 0V19"
                          strokeLinecap="round"
                        />
                        <path
                          d="M16 5.5a3 3 0 0 1 0 5.8M18 14a4.5 4.5 0 0 1 2.5 4v1"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}

                    {item.icon === "check-circle" && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="h-5 w-5"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path
                          d="m8 12 2.5 2.5L16 9"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}

                    {item.icon === "truck" && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="h-5 w-5"
                      >
                        <path
                          d="M3 6h11v11H3zM14 10h4l3 3v4h-7"
                          strokeLinejoin="round"
                        />
                        <circle cx="7.5" cy="18" r="1.8" />
                        <circle cx="17.5" cy="18" r="1.8" />
                      </svg>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-xs leading-5 text-gray-500">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* DISTRIBUTION ACTIVITY */}
        <section
          aria-labelledby="distribution-heading"
          className="rounded-2xl border border-gray-200 bg-white"
        >
          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <div>
              <h2
                id="distribution-heading"
                className="text-lg font-bold text-gray-900"
              >
                Aktivitas Pendistribusian
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Pantau perkembangan penyaluran makanan kepada hewan yang
                membutuhkan.
              </p>
            </div>

            <span className="inline-flex w-fit items-center rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500">
              Data penyaluran
            </span>
          </div>

          <div className="px-5 py-10 text-center sm:px-6 sm:py-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF7F1] text-[#2F7D4A]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-6 w-6"
              >
                <path
                  d="M4 19V5m0 14h16M7 15l4-4 3 2 5-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-sm font-semibold text-gray-800">
              Aktivitas penyaluran akan ditampilkan di sini
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
              Data status penyaluran, waktu, dan dokumentasi akan ditampilkan
              setelah tersedia dari layanan FeedCare.
            </p>
          </div>
        </section>

        {/* CONTRIBUTORS */}
        <section
          aria-labelledby="contributors-heading"
          className="rounded-2xl border border-gray-200 bg-white"
        >
          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <div>
              <h2
                id="contributors-heading"
                className="text-lg font-bold text-gray-900"
              >
                Daftar Kontributor
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Kenali partisipasi komunitas dalam program FeedCare.
              </p>
            </div>

            <span className="text-xs font-medium text-gray-400">
              Data kontributor
            </span>
          </div>

          <div className="px-5 py-9 text-center sm:px-6 sm:py-10">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5"
              >
                <circle cx="9" cy="8" r="3" />
                <path
                  d="M3.5 19v-1.5a5.5 5.5 0 0 1 11 0V19M16 5.5a3 3 0 0 1 0 5.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3 className="mt-3 text-sm font-semibold text-gray-800">
              Data kontributor belum tersedia
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Daftar kontributor akan muncul setelah data kontribusi berhasil
              dihubungkan ke halaman ini.
            </p>
          </div>
        </section>

        {/* FOOD PACKAGES */}
        <section
          id="paket"
          className="scroll-mt-6"
          aria-labelledby="packages-heading"
        >
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <h2
                id="packages-heading"
                className="text-lg font-bold text-gray-900"
              >
                Paket Makanan
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Pilih paket dan tentukan kontribusi yang ingin kamu berikan.
              </p>
            </div>

            <span className="text-xs text-gray-400">
              Paket tersedia melalui layanan FeedCare
            </span>
          </div>

          {children}
        </section>
      </div>
    </div>
  );
}
