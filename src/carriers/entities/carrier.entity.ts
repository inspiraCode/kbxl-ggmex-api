import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Equipment } from './equipment.entity';
import { Operator } from './operator.entity';
import { ShipmentByOrder } from 'src/orders/entities/shipment-by-order.entity';
import { Available } from './available.entity';

@Entity({ name: 'carriers' })
export class Carrier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'legal_name', type: 'varchar', length: 255 })
  legalName: string;

  @Column({ name: 'comertial_name', type: 'varchar', length: 255 })
  comertialName: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  docs: FileList[];

  @Column({
    name: 'hire_date',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  hireDate: Date;

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

  // operator relacion
  @OneToMany(() => Operator, (operator) => operator.carrier)
  operators: Operator[];

  // equipmet relation
  @OneToMany(() => Equipment, (equipment) => equipment.carrier)
  equipments: Equipment[];

  @OneToMany(() => Available, (available) => available.carrier)
  availables: Available[];

  @OneToMany(() => ShipmentByOrder, (shipment) => shipment.carrier)
  shipments: ShipmentByOrder[];
}
