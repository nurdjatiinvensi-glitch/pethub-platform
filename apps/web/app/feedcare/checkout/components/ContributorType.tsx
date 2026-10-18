import type { ContributorType as ContributorTypeValue } from "../lib/feedcare-checkout";

type Props = {
  value: ContributorTypeValue;
  onChange: (value: ContributorTypeValue) => void;
};

export default function ContributorType({ value, onChange }: Props) {
  const options: {
    value: ContributorTypeValue;
    title: string;
    description: string;
  }[] = [
    {
      value: "guest",
      title: "Lanjut sebagai Guest",
      description: "Berkontribusi tanpa harus membuat akun.",
    },
    {
      value: "member",
      title: "Saya Member PetHub",
      description: "Untuk pengguna yang ingin berkontribusi sebagai member.",
    },
  ];

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
            className={`rounded-xl border p-4 text-left transition ${
              value === option.value
                ? "border-[#2F7D4A] bg-[#F1F8F3] ring-1 ring-[#2F7D4A]"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="block text-sm font-bold text-gray-900">
              {option.title}
            </span>
            <span className="mt-1 block text-xs leading-5 text-gray-500">
              {option.description}
            </span>
          </button>
        ))}
      </div>

      {value === "member" && (
        <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          Login member belum dihubungkan. Formulir ini masih berupa simulasi,
          bukan autentikasi.
        </div>
      )}
    </div>
  );
}
