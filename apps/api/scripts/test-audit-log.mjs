
import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import pg from 'pg';

const { Client } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL tidak ditemukan');
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testAuditLog() {
  await client.connect();

  try {
    const id = randomUUID();

    const result = await client.query(
      `INSERT INTO public."auditLog"
        (id, "actorId", action, entity, "entityId", "oldValue", "newValue")
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        id,
        null,
        'ITEM_UPDATED',
        'Item',
        'test-item-001',
        JSON.stringify({ price: 175000 }),
        JSON.stringify({ price: 185000 }),
      ],
    );

    console.log('Audit Log berhasil disimpan:');
    console.log(JSON.stringify(result.rows[0], null, 2));
  } finally {
    await client.end();
  }
}

testAuditLog().catch((error) => {
  console.error('Audit Log gagal:', error);
  process.exitCode = 1;
});
