import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const queueNames = ['order', 'customer', 'session'];

const createQueues = async () => {
  const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost';

  try {
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    for (const queueName of queueNames) {
      await channel.assertQueue(queueName, { durable: true });
      console.log(`Fila '${queueName}' criada com sucesso!`);
    }

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Erro ao criar as filas:', error);
  }
};

createQueues();
