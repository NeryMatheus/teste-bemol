import { Router } from 'express';
import { CustomerAuthService } from '../services/CustomerAuth.service';
import RabbitMQService from './rabbitmq-server';

require('../common/swagger/session.swagger');

const sessionRoutes = Router();

sessionRoutes.post('/', async (req, res, next) => {
  const customerAuthService = new CustomerAuthService();

  const { email, password } = req.body;
  try {
    const session = await customerAuthService.execute({ email, password });

    const server = new RabbitMQService(
      process.env.RABBITMQ_URL || 'defaultRabbitMQUrl'
    );
    await server.start();
    server.publishInQueue('session', JSON.stringify(session));

    res.json(session);
    return;
  } catch (error) {
    next(error);
  }
});

export { sessionRoutes };
