import Link from "next/link";
import CategorySubcategories from "../components/CategorySubcategories";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"
).replace(/\/+$/, "");

type Category = {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
};

type Subcategory = {
  id: string;
  name: string;
  categoryId: string;
  isActive: boolean;
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

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let category: Category | null = null;
  let subcategories: Subcategory[] = [];
  let error = "";

  try {
    const [categoryResponse, subcategoryResponse] = await Promise.all([
      fetch(`${API_URL}/catalog/categories/${id}`, {
        cache: "no-store",
      }),
      fetch(
        `${API_URL}/catalog/subcategories?categoryId=${encodeURIComponent(id)}&includeInactive=true`,
        { cache: "no-store" },
      ),
    ]);

    if (!categoryResponse.ok) {
      throw new Error("Category tidak ditemukan.");
    }

    if (!subcategoryResponse.ok) {
      throw new Error("Gagal mengambil data subcategory.");
    }

    category = await categoryResponse.json();

    const subcategoryData = await subcategoryResponse.json();
    subcategories = normalizeList<Subcategory>(subcategoryData);
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Gagal mengambil detail category.";
  }

  if (!category) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h1 className="text-xl font-bold text-gray-900">Category Not Found</h1>
        <p className="mt-2 text-sm text-gray-500">{error}</p>
        <Link
          href="/admin/categories"
          className="mt-5 inline-block text-sm font-semibold text-green-700"
        >
          ← Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/categories"
          className="text-sm font-medium text-gray-500 hover:text-green-700"
        >
          ← Back to Categories
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          Category Details
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View marketplace category information and its subcategories.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{category.name}</h2>
            <p className="mt-1 text-sm text-gray-500">Category Information</p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              category.isActive
                ? "bg-green-50 text-green-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {category.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="grid gap-6 py-6 md:grid-cols-2">
          <Detail label="Category Name" value={category.name} />
          <Detail label="Category ID" value={category.id} />
        </div>

        <div className="border-t border-gray-100 pt-5">
          <Detail label="Description" value={category.description || "-"} />
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6">
          <CategorySubcategories
            categoryId={category.id}
            categoryActive={category.isActive}
            subcategories={subcategories}
          />
        </div>

        <div className="mt-8 border-t border-gray-100 pt-5">
          <Link
            href={`/admin/categories/${category.id}/edit`}
            className="inline-flex rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
          >
            Edit Category
          </Link>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}
