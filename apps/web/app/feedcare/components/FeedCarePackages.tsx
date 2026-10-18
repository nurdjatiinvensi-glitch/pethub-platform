import Link from "next/link";

type FeedCarePackage = {
  id: string;
  name: string;
  description: string;
  meals: number;
  price: number;
  isActive: boolean;
};

async function getPackages(): Promise<FeedCarePackage[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

  try {
    const response = await fetch(`${apiUrl}/feedcare/packages`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: FeedCarePackage[] = await response.json();

    return data.filter((item) => item.isActive);
  } catch (error) {
    console.error("Gagal mengambil paket FeedCare:", error);
    return [];
  }
}

function formatRupiah(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function FeedCarePackages() {
  const packages = await getPackages();

  return (
    <section id="paket" className="scroll-mt-20 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-orange-500">
            Pilih Paket Donasi
          </span>

          <h2 className="mt-2 text-3xl font-extrabold text-[#064E36] md:text-4xl">
            Satu Kebaikan, Banyak Manfaat
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Pilih paket FeedCare untuk membantu menyediakan makanan bagi mereka
            yang membutuhkan.
          </p>
        </div>

        {packages.length === 0 ? (
          <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-600">
            Paket belum tersedia. Silakan coba kembali nanti.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((item) => (
              <article
                key={item.id}
                className="flex flex-col rounded-2xl border border-gray-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-2xl">
                  🍱
                </div>

                <h3 className="text-xl font-bold text-[#064E36]">
                  {item.name}
                </h3>

                <p className="mt-2 text-sm text-gray-600">{item.description}</p>

                <p className="mt-5 text-sm text-gray-500">Jumlah makanan</p>

                <p className="text-2xl font-extrabold text-[#064E36]">
                  {item.meals} porsi
                </p>

                <p className="mt-3 text-lg font-bold text-orange-600">
                  {formatRupiah(item.price)}
                </p>

                <Link
                  href={`/feedcare/checkout?packageId=${encodeURIComponent(item.id)}`}
                  className="mt-5 block w-full rounded-full bg-[#064E36] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#0A6446]"
                >
                  Pilih Paket →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
