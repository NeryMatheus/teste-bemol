import { In, MoreThanOrEqual, Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Order } from '../entities/Order';
import PaymentStatusEnum from '../common/enum/payment-status.enum';

class OrderRepository {
  private orderRepository: Repository<Order>;

  constructor() {
    this.orderRepository = AppDataSource.getRepository(Order);
  }

  async findOrdersByStatus(status: PaymentStatusEnum[]): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      relations: {
        orderItems: {
          item: true
        },
        customer: {
          deliveryAddress: true
        }
      },
      where: {
        paymentStatus: In(status),
        createdAt: MoreThanOrEqual(
          new Date(new Date().setDate(new Date().getDate() - 7))
        )
      }
    });

    return orders;
  }

  async findOrdersByCity(): Promise<{ city: string; totalSales: number }[]> {
    const result = await this.orderRepository
      .createQueryBuilder('order')
      .innerJoin('order.customer', 'customer')
      .innerJoin('customer.deliveryAddress', 'da')
      .select('da.city', 'city')
      .addSelect('SUM(order.total_amount)', 'totalSales')
      .groupBy('da.city')
      .orderBy('SUM(order.total_amount)', 'DESC')
      .getRawMany();

    return result;
  }
}

export { OrderRepository };
