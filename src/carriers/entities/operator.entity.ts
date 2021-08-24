import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Carrier } from './carrier.entity';
import { Equipment } from './equipment.entity';
import { UnitAvailable } from './unit-available.entity';

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
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Carrier, (carrier) => carrier.operators)
  @JoinColumn({ name: 'carrier_id' })
  carrier: Carrier;

  @ManyToMany(() => Equipment, (equiment) => equiment.operators)
  equipments: Equipment[];

  @OneToMany(() => UnitAvailable, (unitAvailable) => unitAvailable.operator)
  unitAvailable: UnitAvailable;
}
