import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { OrderItem } from './OrdeItem';

@Entity('items')
export class Item extends BaseEntity {
  @Column({ name: 'item_name', type: 'varchar', length: 255 })
  itemName: string;

  @Column({ name: 'item_description', type: 'varchar', length: 255 })
  itemDescription: string;

  @Column({ name: 'unit_price', type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
