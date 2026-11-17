import type { TxContext } from '../../prisma/db-context.js';

type PaymentChanges = {
  status: string;
  paidAt?: string;
  verifiedAt?: string;
  rejectionReason?: string | null;
};

// Mengubah payment HANYA JIKA statusnya masih `expectedStatus`, dalam SATU
// statement SQL:  UPDATE payment SET ... WHERE id = ? AND status = ?
//
// Kenapa tidak memakai orm `.where({ id, status }).update()`? Pada ORM ini
// perintah itu dijalankan sebagai dua statement (SELECT lalu UPDATE ... WHERE id),
// sehingga kondisi status tidak ikut dalam UPDATE dan dua request bersamaan
// sama-sama lolos. Statement tunggal ini membuat database sendiri yang
// menentukan pemenangnya: request kedua akan menunggu, lalu mendapati
// status sudah berubah dan mengubah 0 baris.
//
// Mengembalikan true jika tepat satu baris berubah.
export async function transitionPayment(
  tx: TxContext,
  paymentId: string,
  expectedStatus: string,
  changes: PaymentChanges,
): Promise<boolean> {
  const plan = tx.sql.public.payment
    .update({ ...changes, updatedAt: new Date().toISOString() })
    .where((f, fns) =>
      fns.and(fns.eq(f.id, paymentId), fns.eq(f.status, expectedStatus)),
    )
    .build();

  const stats = await tx.execute(plan);

  return stats.affectedRows === 1;
}
