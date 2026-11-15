import Link from "next/link";
import ItemEditForm from "../../components/ItemEditForm";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"
).replace(/\/$/, "");

type Category = {
  id: string;
  name: string;
  isActive: boolean;
};

type Item = {
  id: string;
  itemCode: string;
  name: string;
  itemType: string;
  description?: string | null;
  price: number;
  categoryId: string;
  subcategoryId?: string | null;
  ownerType: string;
  ownerId?: string | null;
  specifications?: {
    name: string;
    value: string;
  }[];
};

function normalizeList<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];

  if (
    data &&
    typeof data === "object" &&
    Array.isArray((data as { value?: unknown }).value)
  ) {
    return (data as { value: T[] }).value;
  }

  if (data && typeof data === "object" && "id" in data) {
    return [data as T];
  }

  return [];
}

export default async function EditItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let item: Item | null = null;
  let categories: Category[] = [];
  let errorMessage = "";

  try {
    const [itemResponse, categoryResponse] = await Promise.all([
      fetch(`${API_URL}/catalog/items/${id}`, {
        cache: "no-store",
      }),
      fetch(`${API_URL}/catalog/categories`, {
        cache: "no-store",
      }),
    ]);

    if (!itemResponse.ok) {
      throw new Error("Item tidak ditemukan.");
    }

    if (!categoryResponse.ok) {
      throw new Error("Gagal mengambil kategori.");
    }

    item = await itemResponse.json();

    const categoryData = await categoryResponse.json();
    categories = normalizeList<Category>(categoryData);
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan saat mengambil data.";
  }

  if (!item) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h1 className="text-xl font-bold text-gray-900">Unable to Load Item</h1>

        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>

        <Link
          href="/admin/items"
          className="mt-5 inline-block text-sm font-semibold text-green-700"
        >
          ← Back to Items
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/admin/items/${id}`}
          className="text-sm font-medium text-gray-500 hover:text-green-700"
        >
          ← Back to Item Details
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-gray-900">Edit Item</h1>

        <p className="mt-1 text-sm text-gray-500">
          Update marketplace catalog item information.
        </p>
      </div>

      <ItemEditForm item={item} categories={categories} />
    </div>
  );
}
