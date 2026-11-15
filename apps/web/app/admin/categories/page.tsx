import CategoryCreateForm from "./components/CategoryCreateForm";
import CategorySearch from "./components/CategorySearch";

type Category = {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
};

type Subcategory = {
  id: string;
  name: string;
  categoryId: string;
  isActive: boolean;
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"
).replace(/\/+$/, "");

async function getData<T>(endpoint: string): Promise<T[]> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Gagal mengambil data (${response.status})`);
  }

  const data = await response.json();

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.value)) return data.value;
  if (data?.id) return [data];

  return [];
}

export default async function AdminCategoriesPage() {
  let categories: Category[] = [];
  let subcategories: Subcategory[] = [];
  let error = "";

  try {
    [categories, subcategories] = await Promise.all([
      getData<Category>("/catalog/categories?includeInactive=true"),
      getData<Subcategory>("/catalog/subcategories?includeInactive=true"),
    ]);
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Terjadi kesalahan saat mengambil data.";
  }

  const activeCount = categories.filter((item) => item.isActive).length;
  const inactiveCount = categories.length - activeCount;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-gray-500">Marketplace</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
            Categories Management
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage marketplace categories and product classification.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
            <p className="text-xs text-gray-500">Active Categories</p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              {activeCount}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
            <p className="text-xs text-gray-500">Inactive Categories</p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              {inactiveCount}
            </p>
          </div>
        </div>
      </div>

      <CategoryCreateForm />

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          <p className="font-semibold">Gagal memuat data Categories</p>
          <p className="mt-1">{error}</p>
          <p className="mt-2 text-xs">
            Pastikan API berjalan dan NEXT_PUBLIC_API_URL sudah benar.
          </p>
        </div>
      ) : (
        <CategorySearch categories={categories} subcategories={subcategories} />
      )}
    </div>
  );
}
