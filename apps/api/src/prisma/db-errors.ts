// Pelanggaran unique constraint di PostgreSQL (SQLSTATE 23505).
export function isUniqueViolation(error: unknown, constraintHint?: string) {
  const e = error as {
    sqlState?: string;
    constraint?: string;
    cause?: { code?: string };
  } | null;

  const isUnique = e?.sqlState === '23505' || e?.cause?.code === '23505';

  if (!isUnique) return false;
  if (!constraintHint) return true;

  return (e?.constraint ?? '').includes(constraintHint);
}
