import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Customer } from './Customer';
import PaymentStatusEnum from '../common/enum/payment-status.enum';
import { OrderItem } from './OrdeItem';
import { BaseEntity } from './BaseEntity';

@Entity('orders')
export class Order extends BaseEntity {
  @Column({ name: 'customer_id', type: 'uuid' })
  customerId: string;

  @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ name: 'payment_status', type: 'varchar', length: 50 })
  paymentStatus: PaymentStatusEnum;

  @Column({
    name: 'discount_code',
    type: 'varchar',
    length: 50,
    nullable: true
  })
  discountCode: string;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
