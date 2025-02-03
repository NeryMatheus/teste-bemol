import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableItems1738270597555 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'item_name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'item_description',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'unit_price',
            type: 'decimal',
            precision: 10,
            scale: 2
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('items');
  }
}
