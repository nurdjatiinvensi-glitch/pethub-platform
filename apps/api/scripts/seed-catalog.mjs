import 'dotenv/config';
import pg from 'pg';
import { randomUUID } from 'node:crypto';

const { Client } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL tidak ditemukan');
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  await client.connect();
  await client.query('BEGIN');

  try {
    const categoryName = 'Food & Nutrition';
    const subcategoryName = 'Cat Food';

    let categoryResult = await client.query(
      'SELECT id FROM public.category WHERE name = $1 LIMIT 1',
      [categoryName],
    );

    let categoryId;

    if (categoryResult.rowCount > 0) {
      categoryId = categoryResult.rows[0].id;
      console.log(`Category sudah tersedia: ${categoryName}`);
    } else {
      categoryId = randomUUID();

      await client.query(
        `INSERT INTO public.category
          (id, name, description, "isActive", "updatedAt")
         VALUES ($1, $2, $3, true, NOW())`,
        [categoryId, categoryName, 'Food and nutrition products for pets'],
      );

      console.log(`Category dibuat: ${categoryName}`);
    }

    const subcategoryResult = await client.query(
      `SELECT id FROM public."subcategory"
       WHERE name = $1 AND "categoryId" = $2
       LIMIT 1`,
      [subcategoryName, categoryId],
    );

    if (subcategoryResult.rowCount > 0) {
      console.log(`Subcategory sudah tersedia: ${subcategoryName}`);
    } else {
      await client.query(
        `INSERT INTO public."subcategory"
          (id, name, description, "isActive", "categoryId", "updatedAt")
         VALUES ($1, $2, $3, true, $4, NOW())`,
        [
          randomUUID(),
          subcategoryName,
          'Cat food products',
          categoryId,
        ],
      );

      console.log(`Subcategory dibuat: ${subcategoryName}`);
    }

    await client.query('COMMIT');
    console.log('Catalog seed berhasil.');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    await client.end();
  }
}

seed().catch((error) => {
  console.error('Catalog seed gagal:', error);
  process.exitCode = 1;
});
