import type { ReactNode } from "react";

type FeedCareContentProps = {
  children: ReactNode;
};

const steps = [
  {
    number: "01",
    title: "Kenali FeedCare",
    description:
      "Pahami program dan bagaimana kontribusimu membantu hewan yang membutuhkan.",
  },
  {
    number: "02",
    title: "Pilih Member atau Guest",
    description:
      "Gunakan akun PetHub atau lanjut sebagai tamu tanpa wajib membuat akun.",
  },
  {
    number: "03",
    title: "Pilih Paket Makanan",
    description: "Tentukan paket makanan yang ingin kamu bantu salurkan.",
  },
  {
    number: "04",
    title: "Checkout dan Bayar",
    description: "Periksa ringkasan pesanan dan selesaikan pembayaran.",
  },
  {
    number: "05",
    title: "Makanan Disalurkan",
    description:
      "PetHub dan partner memproses pesanan dan menyalurkan makanan.",
  },
  {
    number: "06",
    title: "Terima Laporan",
    description:
      "Dokumentasi dan laporan penyaluran diberikan kepada kontributor.",
  },
];

export default function FeedCareContent({ children }: FeedCareContentProps) {
  return (
    <div className="min-h-full bg-white text-[#123D2A]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#064E36]">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#E9780C]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="text-white">
            <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              PetHub FeedCare
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Beli Makanannya.
              <br />
              <span className="text-[#F5A623]">Bantu Berikan.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              Bantu menyediakan makanan untuk kucing dan anjing terlantar
              melalui paket kontribusi, penyaluran, dokumentasi, dan laporan
              digital.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#paket"
                className="rounded-full bg-[#F5A623] px-7 py-3.5 text-sm font-extrabold text-[#173B29] transition hover:-translate-y-0.5 hover:bg-[#FFC34D]"
              >
                Mulai Berkontribusi →
              </a>

              <a
                href="#cara-kerja"
                className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/15"
              >
                Lihat Cara Kerja
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
              <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#EAF4E9] via-white to-[#FFF3D8] p-7">
                <div className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E8F1EA] text-sm font-black tracking-wide text-[#064E36]">
                    FC
                  </div>

                  <div className="mt-5 text-2xl font-black text-[#064E36]">
                    Small Meals.
                  </div>

                  <div className="text-2xl font-black text-[#E9780C]">
                    Big Impact.
                  </div>

                  <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#5B7467]">
                    Satu pembelian membantu menyediakan makanan dan menjadi
                    bagian dari aksi nyata untuk hewan yang membutuhkan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM INTRODUCTION */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12">
        <div className="grid gap-6 rounded-3xl border border-[#DDE7DF] bg-white p-6 shadow-sm md:grid-cols-[1.1fr_0.9fr] md:items-center md:p-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E9780C]">
              Small Meals. Big Impact.
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#123D2A] sm:text-3xl">
              Satu kontribusi, membantu menghadirkan makanan.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#66786F]">
              FeedCare mengajak masyarakat ikut menyediakan makanan untuk hewan
              terlantar. Setelah penyaluran dilakukan, dokumentasi dan laporan
              diberikan agar kontributor dapat mengetahui hasil kontribusinya.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
            {[
              {
                title: "Pilih kontribusi",
                description: "Tentukan paket makanan yang ingin dibantu.",
              },
              {
                title: "Penyaluran nyata",
                description:
                  "Makanan disalurkan kepada hewan yang membutuhkan.",
              },
              {
                title: "Laporan transparan",
                description:
                  "Dokumentasi membantu menunjukkan hasil penyaluran.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="flex gap-3 rounded-2xl bg-[#F7F8F3] p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F1EA] text-sm font-black text-[#064E36]">
                  0{index + 1}
                </span>

                <div>
                  <h3 className="text-sm font-bold text-[#123D2A]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#718079]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      {children}

      {/* HOW IT WORKS */}
      <section
        id="cara-kerja"
        className="scroll-mt-20 bg-[#F7F8F3] py-12 lg:py-16"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E9780C]">
              How It Works
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#123D2A] sm:text-4xl">
              Dari kepedulian menjadi dampak nyata.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-3xl border border-[#DDE7DF] bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#064E36] text-sm font-black text-white">
                    {step.number}
                  </div>
                </div>

                <h3 className="mt-5 text-lg font-black text-[#123D2A]">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#718079]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#064E36]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-8 lg:py-14">
          <div className="text-white">
            <h2 className="text-3xl font-black tracking-tight">
              Satu tindakan kecil bisa berarti besar bagi mereka.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
              Pilih cara berpartisipasi dan bantu hadirkan makanan bagi hewan
              yang membutuhkan.
            </p>
          </div>

          <a
            href="#paket"
            className="w-fit rounded-full bg-[#F5A623] px-7 py-3.5 text-sm font-extrabold text-[#173B29] transition hover:-translate-y-0.5 hover:bg-[#FFC34D]"
          >
            Mulai Berkontribusi →
          </a>
        </div>
      </section>
    </div>
  );
}
