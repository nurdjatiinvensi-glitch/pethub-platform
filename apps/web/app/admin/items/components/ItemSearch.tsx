"use client";

import { useMemo, useState } from "react";
import ItemActions from "./ItemActions";

type Item = {
  id: string;
  itemCode: string;
  name: string;
  categoryName: string;
  ownerType: string;
  ownerId: string | null;
  price: number;
  isActive: boolean;
};

function formatRupiah(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ItemSearch({ items }: { items: Item[] }) {
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return items;

    return items.filter((item) =>
      [item.name, item.categoryName, item.ownerType, item.ownerId ?? ""].some(
        (value) => value.toLowerCase().includes(keyword),
      ),
    );
  }, [items, search]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-semibold text-gray-900">Item List</h2>
          <p className="mt-1 text-xs text-gray-500">
            Showing {filteredItems.length} of {items.length} items
          </p>
        </div>

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search item..."
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-green-600 sm:max-w-xs"
        />
      </div>

      {filteredItems.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <p className="font-semibold text-gray-800">
            {items.length === 0 ? "Belum ada item" : "Item tidak ditemukan"}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {items.length === 0
              ? "Data item belum tersedia."
              : "Coba gunakan kata kunci pencarian lain."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Item Name</th>
                <th className="px-5 py-4 font-semibold">Category</th>
                <th className="px-5 py-4 font-semibold">Owner</th>
                <th className="px-5 py-4 text-right font-semibold">Price</th>
                <th className="px-5 py-4 text-center font-semibold">Status</th>
                <th className="px-5 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="transition hover:bg-gray-50">
                  <td className="min-w-48 px-5 py-4 font-semibold text-gray-900">
                    {item.name}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {item.categoryName}
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

                  <td className="px-5 py-4 text-center">
                    <ItemActions itemId={item.id} isActive={item.isActive} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
