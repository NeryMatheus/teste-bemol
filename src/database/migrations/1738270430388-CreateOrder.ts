import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrder1738270430388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'customer_id',
            type: 'uuid'
          },
          {
            name: 'total_amount',
            type: 'decimal',
            precision: 10,
            scale: 2
          },
          {
            name: 'payment_status',
            type: 'varchar',
            length: '50'
          },
          {
            name: 'discount_code',
            type: 'varchar',
            length: '50',
            isNullable: true
          },
          {
            name: 'notes',
            type: 'text',
            isNullable: true
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
        ],
        foreignKeys: [
          {
            name: 'orders_customer_id',
            columnNames: ['customer_id'],
            referencedTableName: 'customers',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
