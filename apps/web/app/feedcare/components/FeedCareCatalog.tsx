import Link from "next/link";

type FeedCareItem = {
  id: string;
  name: string;
  description: string;
  price: number | string;
  isActive: boolean;
  ownerType: string;
  ownerId: string | null;
};

async function getItems(): Promise<FeedCareItem[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002";

  try {
    const response = await fetch(`${apiUrl}/catalog/items/feedcare`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: FeedCareItem[] = await response.json();

    return data.filter((item) => item.isActive);
  } catch (error) {
    console.error("Gagal mengambil item FeedCare:", error);
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

export default async function FeedCareCatalog() {
  const items = await getItems();

  return (
    <section id="katalog" className="scroll-mt-20 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-orange-500">
            Katalog FeedCare
          </span>

          <h2 className="mt-2 text-3xl font-extrabold text-[#064E36] md:text-4xl">
            Satu Kebaikan, Banyak Manfaat
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Pilih produk dari katalog PetHub yang tersedia untuk FeedCare.
          </p>
        </div>

        {items.length === 0 ? (
          <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-600">
            Item FeedCare belum tersedia. Silakan coba kembali nanti.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
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

                <p className="mt-1 text-xs text-gray-500">
                  Penjual: {item.ownerType === "MERCHANT" && item.ownerId
                    ? `Toko ${item.ownerId}`
                    : "PetHub"}
                </p>

                <p className="mt-2 text-sm text-gray-600">{item.description}</p>

                <p className="mt-3 text-lg font-bold text-orange-600">
                  {formatRupiah(Number(item.price))}
                </p>

                <Link
                  href={`/feedcare/checkout?itemId=${encodeURIComponent(item.id)}`}
                  className="mt-5 block w-full rounded-full bg-[#064E36] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#0A6446]"
                >
                  Pilih Item →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
