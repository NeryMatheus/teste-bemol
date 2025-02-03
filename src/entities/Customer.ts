import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { Order } from './Order';
import { BaseEntity } from './BaseEntity';
import { DeliveryAddress } from './DeliveryAddress';

@Entity('customers')
class Customer extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  password: string;

  @OneToOne(
    () => DeliveryAddress,
    (deliveryAddress) => deliveryAddress.customer,
    {
      cascade: true
    }
  )
  deliveryAddress: DeliveryAddress;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}

export { Customer };
