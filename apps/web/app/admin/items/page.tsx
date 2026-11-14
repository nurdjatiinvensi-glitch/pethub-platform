type Item = {
  id: string;
  itemCode: string;
  name: string;
  categoryId: string;
  ownerType: string;
  ownerId: string | null;
  price: number;
  isActive: boolean;
};

type Category = {
  id: string;
  name: string;
  isActive: boolean;
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"
).replace(/\/$/, "");

async function getItems(): Promise<Item[]> {
  const response = await fetch(`${API_URL}/catalog/items`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Gagal mengambil data item (${response.status})`);
  }

  return response.json();
}

async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/catalog/categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Gagal mengambil data kategori (${response.status})`);
  }

  const data = await response.json();

  // Jika API mengembalikan array
  if (Array.isArray(data)) {
    return data;
  }

  // Jika API mengembalikan object dengan value
  if (Array.isArray(data?.value)) {
    return data.value;
  }

  // Jika API mengembalikan satu object kategori
  if (data?.id && data?.name) {
    return [data];
  }

  return [];
}

function formatRupiah(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function AdminItemsPage() {
  let items: Item[] = [];
  let categories: Category[] = [];
  let error = "";

  try {
    [items, categories] = await Promise.all([getItems(), getCategories()]);
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Terjadi kesalahan saat mengambil data.";
  }

  const categoryMap = new Map(
    categories.map((category) => [category.id, category.name]),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-gray-500">Marketplace</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
            Items Management
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage PetHub and seller marketplace catalog items.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
          <p className="text-xs text-gray-500">Total Items</p>
          <p className="mt-1 text-xl font-bold text-gray-900">{items.length}</p>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          <p className="font-semibold">Gagal memuat data Items</p>
          <p className="mt-1">{error}</p>
          <p className="mt-2 text-xs">
            Pastikan API berjalan dan NEXT_PUBLIC_API_URL sudah benar.
          </p>
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
          <p className="font-semibold text-gray-800">Belum ada item</p>
          <p className="mt-2 text-sm text-gray-500">
            Data item belum tersedia.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Item Code</th>
                  <th className="px-5 py-4 font-semibold">Item Name</th>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Owner</th>
                  <th className="px-5 py-4 text-right font-semibold">Price</th>
                  <th className="px-5 py-4 text-center font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.id} className="transition hover:bg-gray-50">
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-700">
                      {item.itemCode}
                    </td>

                    <td className="min-w-48 px-5 py-4 font-semibold text-gray-900">
                      {item.name}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {categoryMap.get(item.categoryId) ?? "Unknown Category"}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      <p className="font-medium text-gray-800">
                        {item.ownerType}
                      </p>
                      {item.ownerId && (
                        <p className="mt-1 max-w-32 truncate text-xs text-gray-400">
                          {item.ownerId}
                        </p>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-right font-medium text-gray-800">
                      {formatRupiah(item.price)}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          item.isActive
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500">
            Showing {items.length} items
          </div>
        </div>
      )}
    </div>
  );
}
