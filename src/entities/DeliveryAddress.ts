import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Customer } from './Customer';
@Entity('delivery_addresses')
export class DeliveryAddress extends BaseEntity {
  @Column({ name: 'customer_id', type: 'uuid', unique: true })
  customerId: string;

  @Column({ name: 'street', type: 'varchar', length: 255 })
  street: string;

  @Column({ name: 'number', type: 'varchar', length: 20 })
  number: string;

  @Column({ name: 'complement', type: 'varchar', length: 255 })
  complement: string;

  @Column({ name: 'city', type: 'varchar', length: 100 })
  city: string;

  @Column({ name: 'state', type: 'varchar', length: 50 })
  state: string;

  @Column({ name: 'zip_code', type: 'varchar', length: 20 })
  zipCode: string;

  @OneToOne(() => Customer, (customer) => customer.deliveryAddress, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
