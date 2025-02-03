import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Order } from './Order';
import { v4 as uuid } from 'uuid';
import { Item } from './Item';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantity', type: 'int' })
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Item, (item) => item.orderItems)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
