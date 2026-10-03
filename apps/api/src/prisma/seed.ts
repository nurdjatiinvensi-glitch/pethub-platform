import 'dotenv/config';

import postgres from '@prisma/orm-postgres/runtime';

import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

const db = postgres<Contract>({
  contractJson,
  url: process.env.DATABASE_URL!,
});

const packages = [
  {
    id: '00000000-0000-0000-0000-000000000005',
    name: 'FeedCare 5 Meals',
    meals: 5,
    price: 50000,
    description: 'Paket donasi untuk 5 porsi makanan.',
    isActive: true,
  },
  {
    id: '00000000-0000-0000-0000-000000000010',
    name: 'FeedCare 10 Meals',
    meals: 10,
    price: 100000,
    description: 'Paket donasi untuk 10 porsi makanan.',
    isActive: true,
  },
  {
    id: '00000000-0000-0000-0000-000000000025',
    name: 'FeedCare 25 Meals',
    meals: 25,
    price: 250000,
    description: 'Paket donasi untuk 25 porsi makanan.',
    isActive: true,
  },
  {
    id: '00000000-0000-0000-0000-000000000050',
    name: 'FeedCare 50 Meals',
    meals: 50,
    price: 500000,
    description: 'Paket donasi untuk 50 porsi makanan.',
    isActive: true,
  },
];

async function main() {
  for (const item of packages) {
    await db.orm.public.FeedCarePackage.upsert({
      create: item,
      update: {
        name: item.name,
        meals: item.meals,
        price: item.price,
        description: item.description,
        isActive: item.isActive,
      },
      conflictOn: {
        id: item.id,
      },
    });
  }

  console.log('FeedCare packages seeded successfully.');
}

main()
  .then(async () => {
    await db.close();
  })
  .catch(async (error) => {
    console.error(error);
    await db.close();
    process.exit(1);
  });