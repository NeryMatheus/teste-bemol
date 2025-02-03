import { Router } from 'express';
import { customerRoutes } from './customer.routes';
import { sessionRoutes } from './session.routes';
import { ensureAuth } from '../middleware/ensureAuth';
import { orderRoutes } from './order.routes';

const routes = Router();

routes.use('/session', sessionRoutes);
routes.use('/customer', ensureAuth, customerRoutes);
routes.use('/order', ensureAuth, orderRoutes);

export { routes };
