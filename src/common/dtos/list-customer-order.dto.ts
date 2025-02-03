import { DeepPartial } from 'typeorm';
import { OrderItem } from '../../entities/OrdeItem';
import { Order } from '../../entities/Order';
import { ApplyDiscount } from '../utils/ApplyDiscount';
import { DeliveryAddress } from '../../entities/DeliveryAddress';
import PaymentStatusEnum from '../enum/payment-status.enum';

class ListCustomerOrdersDTO {
  orderId: string;
  totalAmount: number;
  orderDate: Date;
  paymentStatus: PaymentStatusEnum;
  discountCode: string;
  totalAmountWithDiscount: number | null;
  notes: string;
  orderItems: DeepPartial<OrderItem[]>;
  deliveryAddress: DeepPartial<DeliveryAddress>;

  constructor(order: Order) {
    this.orderId = order.id;
    this.totalAmount = parseFloat(order.totalAmount.toString());
    this.orderDate = order.createdAt;
    this.paymentStatus = order.paymentStatus;
    this.discountCode = order.discountCode;
    this.totalAmountWithDiscount = ApplyDiscount(
      order.discountCode,
      order.totalAmount
    );
    this.notes = order.notes;
    this.orderItems =
      order.orderItems.length > 0
        ? order?.orderItems.map((orderItem) => ({
            id: orderItem.id,
            itemName: orderItem.item.itemName,
            itemSpecification: orderItem.item.itemDescription,
            quantity: orderItem.quantity,
            unitPrice: parseFloat(orderItem.item.unitPrice.toString())
          }))
        : [];
    this.deliveryAddress =
      order.customer && order.customer.deliveryAddress
        ? {
            customer: {
              name: order.customer.name,
              cpf: order.customer.cpf
            },
            street: order.customer.deliveryAddress.street,
            number: order.customer.deliveryAddress.number,
            city: order.customer.deliveryAddress.city,
            state: order.customer.deliveryAddress.state,
            zipCode: order.customer.deliveryAddress.zipCode
          }
        : {};
  }
}

export { ListCustomerOrdersDTO };
