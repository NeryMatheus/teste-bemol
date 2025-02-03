import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class DeliveryAddresses1738270664182 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'delivery_addresses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'customer_id',
            type: 'uuid',
            isUnique: true
          },
          {
            name: 'street',
            type: 'varchar',
            length: '255'
          },
          {
            name: 'number',
            type: 'varchar'
          },
          {
            name: 'complement',
            type: 'varchar',
            length: '255',
            isNullable: true
          },
          {
            name: 'city',
            type: 'varchar',
            length: '100'
          },
          {
            name: 'state',
            type: 'varchar',
            length: '50'
          },
          {
            name: 'zip_code',
            type: 'varchar',
            length: '20'
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
            name: 'delivery_addresses_customer_id',
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
    await queryRunner.dropTable('delivery_addresses');
  }
}
