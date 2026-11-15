#!/usr/bin/env -S node
import type { SqlMigrationPlanOperation } from '@prisma/orm-family-sql/family/control';
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';
import type { PostgresPlanTargetDetails } from '@prisma/orm-target-postgres/target/planner-target-details';
import type { Contract as Start } from '../../snapshots/54727e1c56c6ba0c7955dcb5261d70fc34367842fe0565c87f97c6400da57073/contract';
import startContract from '../../snapshots/54727e1c56c6ba0c7955dcb5261d70fc34367842fe0565c87f97c6400da57073/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/a2a31bb4c5df05cc97358822e67f162d2ce17962f0f4e50d35a86500b417e061/contract';
import endContract from '../../snapshots/a2a31bb4c5df05cc97358822e67f162d2ce17962f0f4e50d35a86500b417e061/contract.json' with { type: 'json' };

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations(): readonly (
  | SqlMigrationPlanOperation<PostgresPlanTargetDetails>
  | Promise<SqlMigrationPlanOperation<PostgresPlanTargetDetails>>
)[] {
  return [
    this.alterColumnType({
      schema: 'public',
      table: 'item',
      column: 'price',
      options: {
        qualifiedTargetType: 'numeric',
        formatTypeExpected: 'numeric',
        rawTargetTypeForLabel: 'numeric',
      },
    }),
  ];
}
}

MigrationCLI.run(import.meta.url, M);