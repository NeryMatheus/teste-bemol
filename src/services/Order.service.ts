import { ListCustomerOrdersDTO } from '../common/dtos/list-customer-order.dto';
import PaymentStatusEnum from '../common/enum/payment-status.enum';
import { AppError } from '../common/errors/AppError';
import { OrderRepository } from '../repositories/Order.repository';

class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository = new OrderRepository()
  ) {}

  async findOrdersByStatus(status: string): Promise<ListCustomerOrdersDTO[]> {
    if (!status) {
      throw new AppError('No valid status reported', 400);
    }

    const statusArray = Array.isArray(status) ? status : [status];
    statusArray.forEach((s, index) => {
      if (typeof s === 'string') {
        statusArray[index] = s.toUpperCase();
      }
    });
    const validStatuses = statusArray.filter((s) =>
      Object.values(PaymentStatusEnum).includes(s as PaymentStatusEnum)
    ) as PaymentStatusEnum[];

    const orders = await this.orderRepository.findOrdersByStatus(validStatuses);

    if (orders.length === 0) {
      throw new AppError('No orders found', 404);
    }

    return orders.map((order) => new ListCustomerOrdersDTO(order));
  }

  async findOrdersByCity() /* : Promise<Order[]> */ {
    const orders = await this.orderRepository.findOrdersByCity();

    if (orders.length === 0) {
      throw new AppError('No orders found', 404);
    }

    return orders;
  }

  // async createOrder(order: any) {
  //   return new ListCustomerOrdersDTO(newOrder);
  // }
}

export { OrderService };
