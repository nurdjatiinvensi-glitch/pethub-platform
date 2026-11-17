import type { PrismaService } from './prisma.service.js';

// Koneksi database yang bisa dipakai service: bisa client biasa, bisa juga
// konteks transaksi (tx) dari `prisma.client.transaction(async (tx) => ...)`.
// Dengan menerima DbContext, sebuah service bisa ikut dalam transaksi milik
// pemanggilnya, sehingga beberapa langkah berhasil atau gagal bersama.
export type DbContext = Pick<PrismaService['client'], 'orm'>;

// Konteks transaksi penuh (punya orm, sql builder, dan execute).
export type TxContext = Parameters<
  Parameters<PrismaService['client']['transaction']>[0]
>[0];
