#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/896207bb687d3179b9b57ecf4af8bdc9583e3af4cc6778166a0b92fb26e6963f/contract';
import endContract from '../../snapshots/896207bb687d3179b9b57ecf4af8bdc9583e3af4cc6778166a0b92fb26e6963f/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/a2a31bb4c5df05cc97358822e67f162d2ce17962f0f4e50d35a86500b417e061/contract';
import startContract from '../../snapshots/a2a31bb4c5df05cc97358822e67f162d2ce17962f0f4e50d35a86500b417e061/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'feedCareOrder',
        column: col('itemId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'item',
        column: col('isFeedCareEligible', 'bool', {
          notNull: true,
          default: lit(false),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'feedCareOrder',
        column: 'totalAmount',
        options: {
          qualifiedTargetType: 'numeric',
          formatTypeExpected: 'numeric',
          rawTargetTypeForLabel: 'numeric',
        },
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'payment',
        column: 'amount',
        options: {
          qualifiedTargetType: 'numeric',
          formatTypeExpected: 'numeric',
          rawTargetTypeForLabel: 'numeric',
        },
      }),
      this.alterColumnType({
        schema: 'public',
        table: 'payment',
        column: 'paidAmount',
        options: {
          qualifiedTargetType: 'numeric',
          formatTypeExpected: 'numeric',
          rawTargetTypeForLabel: 'numeric',
        },
      }),
      this.dropNotNull({ schema: 'public', table: 'feedCareOrder', column: 'mealsPurchased' }),
      this.dropNotNull({ schema: 'public', table: 'feedCareOrder', column: 'packageId' }),
      this.createIndex({
        schema: 'public',
        table: 'feedCareOrder',
        index: 'feedCareOrder_itemId_idx_41357140',
        columns: ['itemId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'feedCareOrder',
        foreignKey: {
          name: 'feedCareOrder_itemId_fkey',
          columns: ['itemId'],
          references: { schema: 'public', table: 'item', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
