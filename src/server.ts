import express, { Request, Response, NextFunction } from 'express';
import { routes } from './routes';
import { AppError } from './common/errors/AppError';
import { AppDataSource } from '../data-source';
import { swaggerUi, swaggerSpec } from '../swagger';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(routes);
app.use(
  process.env.SWAGGER_PATH || '/api',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message
    });
    return;
  }

  response.status(500).json({
    status: 500,
    message: 'Internal Server Error'
  });
  return;
});

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    console.log('Database connected!');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};

startServer();
