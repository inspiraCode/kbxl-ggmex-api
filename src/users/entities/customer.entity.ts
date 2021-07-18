import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'customer_number',
    type: 'varchar',
    length: 150,
    unique: true,
  })
  customerNumber: string;

  @Column({ name: 'customer_name', type: 'varchar', length: 255, unique: true })
  customerName: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 255 })
  phoneNumber: string;

  @Column({ name: 'main_contact', type: 'varchar', length: 255 })
  mainContact: string;

  @Column({ name: 'is_enabled', type: 'boolean', default: true })
  isEnabled: boolean;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(() => User, (user) => user.customer, { nullable: true })
  users: User[];
}
