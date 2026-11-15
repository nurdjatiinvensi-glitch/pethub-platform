"use client";

import { useMemo, useState } from "react";
import CategoryActions from "./CategoryActions";

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

export default function CategorySearch({
  categories,
  subcategories,
}: {
  categories: Category[];
  subcategories: Subcategory[];
}) {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return categories;

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(keyword) ||
        (category.description ?? "").toLowerCase().includes(keyword),
    );
  }, [categories, search]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-semibold text-gray-900">Category List</h2>
          <p className="mt-1 text-xs text-gray-500">
            Showing {filteredCategories.length} of {categories.length}{" "}
            categories
          </p>
        </div>

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search category..."
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-green-600 sm:max-w-xs"
        />
      </div>

      {filteredCategories.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <p className="font-semibold text-gray-800">
            {categories.length === 0
              ? "Belum ada kategori"
              : "Kategori tidak ditemukan"}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {categories.length === 0
              ? "Data kategori belum tersedia."
              : "Coba gunakan kata kunci pencarian lain."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Category Name</th>
                <th className="px-5 py-4 font-semibold">Description</th>
                <th className="px-5 py-4 font-semibold">Subcategories</th>
                <th className="px-5 py-4 text-center font-semibold">Status</th>
                <th className="px-5 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredCategories.map((category) => {
                const categorySubcategories = subcategories.filter(
                  (item) => item.categoryId === category.id && item.isActive,
                );

                return (
                  <tr key={category.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4 font-semibold text-gray-900">
                      {category.name}
                    </td>

                    <td className="min-w-48 px-5 py-4 text-gray-600">
                      {category.description || "-"}
                    </td>

                    <td className="min-w-48 px-5 py-4">
                      {categorySubcategories.length > 0 ? (
                        <div className="flex flex-col items-start gap-1">
                          {categorySubcategories.map((item) => (
                            <span
                              key={item.id}
                              className="text-sm text-green-700"
                            >
                              {item.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">No subcategories</span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          category.isActive
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <CategoryActions
                        categoryId={category.id}
                        isActive={category.isActive}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
