const packages = [
  {
    name: "FeedCare 5 Meals",
    meals: 5,
    price: "Rp 50.000",
    description: "5 porsi makanan + jasa feeding + laporan digital",
    icon: "🥣",
  },
  {
    name: "FeedCare 10 Meals",
    meals: 10,
    price: "Rp 100.000",
    description: "10 porsi makanan + jasa feeding + laporan digital",
    icon: "🥣",
  },
  {
    name: "FeedCare 25 Meals",
    meals: 25,
    price: "Rp 250.000",
    description: "25 porsi makanan + jasa feeding + laporan digital",
    icon: "🥣",
  },
  {
    name: "FeedCare 50 Meals",
    meals: 50,
    price: "Rp 500.000",
    description: "50 porsi makanan + jasa feeding + laporan digital",
    icon: "🥣",
  },
];

const donors = [
  {
    initials: "BS",
    name: "Budi S.",
    package: "FeedCare 10 Meals",
    meals: 10,
    date: "12 Sep 2026",
  },
  {
    initials: "AL",
    name: "Ani L.",
    package: "FeedCare 25 Meals",
    meals: 25,
    date: "11 Sep 2026",
  },
  {
    initials: "DR",
    name: "D*** R.",
    package: "FeedCare 5 Meals",
    meals: 5,
    date: "10 Sep 2026",
  },
  {
    initials: "MT",
    name: "Mita T.",
    package: "FeedCare 50 Meals",
    meals: 50,
    date: "10 Sep 2026",
  },
  {
    initials: "RK",
    name: "Raka K.",
    package: "FeedCare 10 Meals",
    meals: 10,
    date: "9 Sep 2026",
  },
];

const steps = [
  {
    number: "01",
    title: "Pilih Paket",
    description: "Pilih paket makanan FeedCare yang ingin kamu berikan.",
    icon: "🛒",
  },
  {
    number: "02",
    title: "Lakukan Pembayaran",
    description: "Selesaikan pembayaran dengan metode yang tersedia.",
    icon: "💳",
  },
  {
    number: "03",
    title: "Kami Siapkan Makanan",
    description: "PetHub menyiapkan makanan sesuai jumlah paket.",
    icon: "🥣",
  },
  {
    number: "04",
    title: "Kami Salurkan",
    description:
      "PetHub dan partner menyalurkan makanan kepada hewan yang membutuhkan.",
    icon: "🚚",
  },
  {
    number: "05",
    title: "Dokumentasi",
    description: "Kegiatan feeding didokumentasikan dengan foto dan video.",
    icon: "📷",
  },
  {
    number: "06",
    title: "Terima Laporan",
    description: "Laporan digital dikirimkan kepada donatur.",
    icon: "📋",
  },
];

export default function FeedCarePage() {
  return (
    <main className="min-h-screen bg-[#F7F8F3] text-[#123D2A]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#DDE7DF] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div>
            <div className="text-2xl font-black tracking-tight text-[#064E36]">
              PetHub<span className="text-[#F5A623]">.</span>id
            </div>
            <div className="text-[10px] font-semibold tracking-wide text-[#5B7467]">
              All-in-One Pet Ecosystem
            </div>
          </div>

          <a
            href="#paket"
            className="rounded-full bg-[#E9780C] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#D96808]"
          >
            Ikut FeedCare
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#064E36]">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#E9780C]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="text-white">
            <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              🐾 PetHub FeedCare
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Beli Makanannya.
              <br />
              <span className="text-[#F5A623]">Bantu Berikan.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              Paket makanan berkualitas untuk kucing dan anjing jalanan atau
              yang membutuhkan, lengkap dengan jasa feeding dan laporan digital.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#paket"
                className="rounded-full bg-[#F5A623] px-7 py-3.5 text-sm font-extrabold text-[#173B29] transition hover:-translate-y-0.5 hover:bg-[#FFC34D]"
              >
                Beli Paket FeedCare →
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
                  <div className="text-6xl">🐕 🐈</div>

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

      {/* PUBLIC IMPACT DASHBOARD */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E9780C]">
            FeedCare Impact
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-[#123D2A]">
            Bersama, kita berikan dampak nyata.
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#66786F]">
            Data kontribusi FeedCare diperbarui berdasarkan transaksi dan proses
            penyaluran yang telah dilakukan.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ImpactCard
            icon="🐾"
            value="1.250"
            label="Meals Purchased"
            description="Total makanan yang sudah dibeli"
          />

          <ImpactCard
            icon="🥣"
            value="980"
            label="Meals Distributed"
            description="Total makanan yang sudah tersalurkan"
          />

          <ImpactCard
            icon="👥"
            value="85"
            label="Donors"
            description="Jumlah donatur yang berpartisipasi"
          />

          <ImpactCard
            icon="📋"
            value="32"
            label="Orders"
            description="Total transaksi FeedCare"
          />
        </div>
      </section>

      {/* DONOR LIST */}
      <section className="mx-auto max-w-7xl px-5 pb-14 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-[#DDE7DF] bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-[#E8EEE9] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#E9780C]">
                Terima Kasih
              </p>

              <h2 className="mt-1 text-2xl font-black text-[#123D2A]">
                Donatur yang Sudah Berpartisipasi
              </h2>

              <p className="mt-1 text-sm text-[#66786F]">
                Terima kasih kepada semua yang telah mendukung FeedCare.
              </p>
            </div>

            <button
              type="button"
              className="w-fit rounded-full border border-[#CFE0D3] px-5 py-2.5 text-sm font-bold text-[#064E36] transition hover:bg-[#F2F7F3]"
            >
              Lihat Semua →
            </button>
          </div>

          <div className="divide-y divide-[#EEF2EF]">
            {donors.map((donor) => (
              <div
                key={`${donor.name}-${donor.date}`}
                className="grid gap-3 px-5 py-4 sm:grid-cols-[auto_1fr_auto_auto] sm:items-center"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F1EA] text-xs font-black text-[#064E36]">
                  {donor.initials}
                </div>

                <div>
                  <div className="font-bold text-[#123D2A]">{donor.name}</div>
                  <div className="text-xs text-[#7A8A82]">{donor.package}</div>
                </div>

                <div className="text-sm font-bold text-[#064E36]">
                  {donor.meals} Meals
                </div>

                <div className="text-xs text-[#7A8A82]">{donor.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="paket" className="bg-white py-16 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E9780C]">
              Pilih Paket
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#123D2A] sm:text-4xl">
              Pilih paket FeedCare yang ingin kamu berikan.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#66786F]">
              Setiap paket mencakup makanan, jasa feeding, dan laporan digital
              sebagai bukti penyaluran.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((item) => (
              <div
                key={item.name}
                className="group flex flex-col rounded-3xl border border-[#DDE7DF] bg-[#FAFCF9] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#B9D0BF] hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{item.icon}</div>

                  <div className="rounded-full bg-[#E8F1EA] px-3 py-1 text-xs font-bold text-[#064E36]">
                    {item.meals} Meals
                  </div>
                </div>

                <h3 className="mt-5 text-lg font-black text-[#123D2A]">
                  {item.name}
                </h3>

                <p className="mt-2 min-h-12 text-sm leading-5 text-[#718079]">
                  {item.description}
                </p>

                <div className="mt-5 text-2xl font-black text-[#064E36]">
                  {item.price}
                </div>

                <button
                  type="button"
                  className="mt-5 w-full rounded-full bg-[#064E36] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0A6446]"
                >
                  Pilih Paket →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="cara-kerja" className="bg-[#F7F8F3] py-16 scroll-mt-20">
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

                  <div className="text-3xl">{step.icon}</div>
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
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="text-white">
            <h2 className="text-3xl font-black tracking-tight">
              Satu tindakan kecil bisa berarti besar bagi mereka.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
              Yuk ikut FeedCare dan bantu berikan makanan kepada hewan yang
              membutuhkan.
            </p>
          </div>

          <a
            href="#paket"
            className="w-fit rounded-full bg-[#F5A623] px-7 py-3.5 text-sm font-extrabold text-[#173B29] transition hover:-translate-y-0.5 hover:bg-[#FFC34D]"
          >
            Beli Paket FeedCare →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#DDE7DF] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 text-center text-xs text-[#718079] lg:px-8">
          © 2026 PetHub.id — FeedCare
        </div>
      </footer>
    </main>
  );
}

function ImpactCard({
  icon,
  value,
  label,
  description,
}: {
  icon: string;
  value: string;
  label: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-[#DDE7DF] bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F1EA] text-xl">
        {icon}
      </div>

      <div className="mt-5 text-3xl font-black tracking-tight text-[#064E36]">
        {value}
      </div>

      <div className="mt-1 font-bold text-[#123D2A]">{label}</div>

      <div className="mt-1 text-xs leading-5 text-[#7A8A82]">{description}</div>
    </div>
  );
}
