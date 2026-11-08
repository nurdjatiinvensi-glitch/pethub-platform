import 'dotenv/config';

import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import postgres from '@prisma/orm-postgres/runtime';

import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly db = postgres<Contract>({
    contractJson,
    url: process.env.DATABASE_URL,
  });

  async onModuleInit() {
    await this.db.connect();

    console.log(
      'ORM MODELS:',
      Object.keys(this.db.orm.public),
    );

  }

  async onModuleDestroy() {
    await this.db.close();
  }

  get client() {
    return this.db;
  }
}
