import 'dotenv/config';
import { DataSource } from 'typeorm';
import path from 'path';

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, 'src', 'entities', '**', '*.ts')],
  migrations: [path.join(__dirname, 'src', 'database', 'migrations', '*.ts')],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: false
});
