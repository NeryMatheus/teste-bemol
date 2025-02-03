import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed1738429306809 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO public.customers (id,"name",email,cpf,"password",created_at,updated_at,deleted_at) VALUES
          ('36593b89-9409-456d-b799-8c7b9acdb588'::uuid,'Admin','admin@example.com','123.456.789-10','$2b$08$7NNjv6j846fZIPQa6KtQCOiTS3kPWexNh5sMPAxGhEpA/Th7kKUAy','2025-01-31 13:03:22.541377','2025-01-31 13:03:22.541377',NULL),
          ('6eecb9c1-45b0-40ab-9e57-da38632ff638'::uuid,'Matheus Nery','matheus@example.com','000.000.000-00','$2b$08$7NNjv6j846fZIPQa6KtQCOiTS3kPWexNh5sMPAxGhEpA/Th7kKUAy','2025-01-31 13:03:22.541377','2025-01-31 13:03:22.541377',NULL);

        INSERT INTO public.delivery_addresses (id,customer_id,street,"number",complement,city,state,zip_code,created_at,updated_at,deleted_at) VALUES
          ('20253c48-6a02-4613-afbe-1e6f6a0a16fa'::uuid,'36593b89-9409-456d-b799-8c7b9acdb588'::uuid,'Rua Washington Luis','445',NULL,'Manaus','Amazonas','69040210','2025-01-31 11:17:42.835','2025-01-31 11:17:42.835',NULL),
          ('b7ed38a2-b2bb-448a-8216-4274ed11238b'::uuid,'6eecb9c1-45b0-40ab-9e57-da38632ff638'::uuid,'Rua Unicórnio','95','Beco Solimões','Barcelos','Amazonas','69040000','2025-01-31 11:17:42.835','2025-01-31 11:17:42.835',NULL);

        INSERT INTO public.orders (id,customer_id,total_amount,payment_status,discount_code,notes,created_at,updated_at,deleted_at) VALUES
          ('87663e2f-f06e-48b9-b818-2243c50752d5'::uuid,'36593b89-9409-456d-b799-8c7b9acdb588'::uuid,899.99,'PENDING','PROMO10','Entregar no período da manhã','2025-01-31 11:18:48.731','2025-01-31 11:18:48.731',NULL),
          ('e73598cb-9ee8-42a0-b6d2-08d4fe8ec5d1'::uuid,'36593b89-9409-456d-b799-8c7b9acdb588'::uuid,1099.99,'FAILED',NULL,'Entregar no período da manhã','2025-01-31 11:18:48.731','2025-01-31 11:18:48.731',NULL),
          ('20d99537-93e2-4adf-b1ab-a0f0a58b4ace'::uuid,'6eecb9c1-45b0-40ab-9e57-da38632ff638'::uuid,1.99,'FAILED',NULL,'Entregar no período da manhã','2025-01-31 11:18:48.731','2025-01-31 11:18:48.731',NULL),
          ('d8754b02-ef46-4cd5-8922-4829f89f2bea'::uuid,'6eecb9c1-45b0-40ab-9e57-da38632ff638'::uuid,2.99,'FAILED',NULL,'Entregar no período da manhã','2025-01-31 11:18:48.731','2025-01-31 11:18:48.731',NULL);

        INSERT INTO public.items (id,item_name,item_description,unit_price,created_at,updated_at,deleted_at) VALUES
          ('c62d7359-9e40-487b-9c16-383516f52d02'::uuid,'Teclado Gamer','Teclado gamer da HyperX',299.99,'2025-01-31 13:06:48.319191','2025-01-31 13:06:48.319191',NULL),
          ('0a66bb58-083c-4a06-a056-7782ca03bce6'::uuid,'Cadeira Gamer','Cadeira gamer da DELL',599.99,'2025-01-31 13:06:48.296728','2025-01-31 13:06:48.296728',NULL),
          ('5edd1202-44af-40be-b4d8-d78d2a0e5e04'::uuid,'Mouse Gamer','Mouse gamer da Razer',1099.99,'2025-01-31 13:06:48.296728','2025-01-31 13:06:48.296728',NULL);


        INSERT INTO public.order_items (id,order_id,item_id,quantity) VALUES
          ('dc95e649-dda1-4e5c-a300-4eb0466fe5b5'::uuid,'87663e2f-f06e-48b9-b818-2243c50752d5'::uuid,'0a66bb58-083c-4a06-a056-7782ca03bce6'::uuid,1),
          ('81d9127a-01d8-4126-a114-da4a7be39b1b'::uuid,'87663e2f-f06e-48b9-b818-2243c50752d5'::uuid,'c62d7359-9e40-487b-9c16-383516f52d02'::uuid,1),
          ('3fff9e20-7dd2-4c18-8d32-1f852f26d863'::uuid,'e73598cb-9ee8-42a0-b6d2-08d4fe8ec5d1'::uuid,'5edd1202-44af-40be-b4d8-d78d2a0e5e04'::uuid,1);
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DO $$
          DECLARE
              r RECORD;
          BEGIN
              FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public')
              LOOP
                  EXECUTE 'TRUNCATE TABLE public.' || r.tablename || ' CASCADE';
              END LOOP;
          END $$;
      `);
  }
}
