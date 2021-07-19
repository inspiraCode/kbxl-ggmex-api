import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Carrier } from './carrier.entity';
import { Equipment } from './equipment.entity';

@Entity({ name: 'operators' })
export class Operator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'operator_name', type: 'varchar', length: 255 })
  operatorName: string;

  @Column({ name: 'license_number', type: 'varchar', length: 255 })
  licenseNumber: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'phone_number', type: 'varchar', length: 255 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  docs: FileList[];

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

  @ManyToOne(() => Carrier, (carrier) => carrier.operator)
  carrier: Carrier[];

  @ManyToMany(() => Equipment, (equiment) => equiment.operators)
  equipments: Equipment[];
}
