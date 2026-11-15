import ItemCreateForm from "./components/ItemCreateForm";
import ItemSearch from "./components/ItemSearch";

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
).replace(/\/+$/, "");

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

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.value)) return data.value;
  if (data?.id && data?.name) return [data];

  return [];
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

  const activeCount = items.filter((item) => item.isActive).length;
  const inactiveCount = items.length - activeCount;

  const categoryMap = new Map(
    categories.map((category) => [category.id, category.name]),
  );

  const displayItems = items.map((item) => ({
    ...item,
    categoryName: categoryMap.get(item.categoryId) ?? "Unknown Category",
  }));

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

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
            <p className="text-xs text-gray-500">Active Items</p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              {activeCount}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
            <p className="text-xs text-gray-500">Inactive Items</p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              {inactiveCount}
            </p>
          </div>
        </div>
      </div>

      <ItemCreateForm categories={categories} />

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          <p className="font-semibold">Gagal memuat data Items</p>
          <p className="mt-1">{error}</p>
          <p className="mt-2 text-xs">
            Pastikan API berjalan dan NEXT_PUBLIC_API_URL sudah benar.
          </p>
        </div>
      ) : (
        <ItemSearch items={displayItems} />
      )}
    </div>
  );
}
