import { Router } from 'express';
import RabbitMQService from './rabbitmq-server';
import { CustomerService } from '../services/Customer.service';

require('../common/swagger/customer.swagger');

const customerRoutes = Router();

customerRoutes.post('/', async (req, res, next) => {
  const {
    name,
    email,
    password,
    cpf,
    street,
    number,
    complement,
    city,
    state,
    zipcode
  } = req.body;
  const createCustomerService = new CustomerService();

  try {
    const customer = await createCustomerService.createCustomer({
      name,
      email,
      password,
      cpf,
      street,
      number,
      complement,
      city,
      state,
      zipcode
    });

    const server = new RabbitMQService(
      process.env.RABBITMQ_URL || 'defaultRabbitMQUrl'
    );
    await server.start();
    server.publishInQueue('customer', JSON.stringify(customer));

    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
});

customerRoutes.get('/orders', async (req, res, next) => {
  const { id } = req.customer;
  const customerService = new CustomerService();

  try {
    const orders = await customerService.getOrders(id);

    const server = new RabbitMQService(
      process.env.RABBITMQ_URL || 'defaultRabbitMQUrl'
    );
    await server.start();
    server.publishInQueue('customer', JSON.stringify(orders));

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

export { customerRoutes };
