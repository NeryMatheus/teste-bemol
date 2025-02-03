import { Router } from 'express';
import { OrderService } from '../services/Order.service';
import RabbitMQService from './rabbitmq-server';

require('../common/swagger/order.swagger');

const orderRoutes = Router();

orderRoutes.get('/', async (req, res, next) => {
  try {
    const { status } = req.query;

    const orderService = new OrderService();
    const orders = await orderService.findOrdersByStatus(status as string);

    const server = new RabbitMQService(
      process.env.RABBITMQ_URL || 'defaultRabbitMQUrl'
    );
    await server.start();
    server.publishInQueue('order', JSON.stringify(orders));

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

orderRoutes.get('/city', async (req, res, next) => {
  try {
    const orderService = new OrderService();
    const orders = await orderService.findOrdersByCity();

    const server = new RabbitMQService(
      process.env.RABBITMQ_URL || 'defaultRabbitMQUrl'
    );
    await server.start();
    server.publishInQueue('order', JSON.stringify(orders));

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// orderRoutes.post('/', async (req, res, next) => {
//   try {
//     const orderService = new OrderService();
//     const order = await orderService.createOrder(req.body);

//     const server = new RabbitMQService(
//       process.env.RABBITMQ_URL || 'defaultRabbitMQUrl'
//     );
//     await server.start();
//     server.publishInQueue('order', JSON.stringify(order));

//     res.status(201).json(order);
//   } catch (error) {
//     next(error);
//   }
// });
export { orderRoutes };
