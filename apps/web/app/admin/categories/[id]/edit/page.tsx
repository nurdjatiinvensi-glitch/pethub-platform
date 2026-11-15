import Link from "next/link";
import CategoryEditForm from "../../components/CategoryEditForm";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"
).replace(/\/+$/, "");

type Category = {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
};

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let category: Category | null = null;
  let errorMessage = "";

  try {
    const response = await fetch(`${API_URL}/catalog/categories/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Category tidak ditemukan.");
    }

    category = await response.json();
  } catch (err) {
    errorMessage =
      err instanceof Error
        ? err.message
        : "Terjadi kesalahan saat mengambil data.";
  }

  if (!category) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h1 className="text-xl font-bold text-gray-900">
          Unable to Load Category
        </h1>

        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>

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
          href={`/admin/categories/${id}`}
          className="text-sm font-medium text-gray-500 hover:text-green-700"
        >
          ← Back to Category Details
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-gray-900">Edit Category</h1>

        <p className="mt-1 text-sm text-gray-500">
          Update marketplace category information.
        </p>
      </div>

      <CategoryEditForm category={category} />
    </div>
  );
}
