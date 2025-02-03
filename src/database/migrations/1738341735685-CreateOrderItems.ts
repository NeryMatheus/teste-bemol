import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderItems1738341735685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'order_id',
            type: 'uuid'
          },
          {
            name: 'item_id',
            type: 'uuid'
          },
          {
            name: 'quantity',
            type: 'int'
          }
        ],
        foreignKeys: [
          {
            name: 'order_items_order_id',
            columnNames: ['order_id'],
            referencedTableName: 'orders',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
          },
          {
            name: 'order_items_item_id',
            columnNames: ['item_id'],
            referencedTableName: 'items',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_items');
  }
}
