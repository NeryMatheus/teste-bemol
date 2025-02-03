import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';

class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: 'now()' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: 'now()' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { BaseEntity };
