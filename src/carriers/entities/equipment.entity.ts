import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Carrier } from './carrier.entity';
import { Operator } from './operator.entity';
import { Pm } from './pm.entity';

@Entity({ name: 'equipments' })
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'unit_type', type: 'varchar', length: 255 })
  unitType: string;

  @Column({ type: 'varchar', length: 255 })
  capacity: string;

  @Column({ type: 'varchar', length: 255 })
  model: string;

  @Column({ type: 'varchar', length: 255 })
  brand: string;

  @Column({ name: 'kbxl_equipment_number', type: 'varchar', length: 255 })
  kbxlEquipmentNumber;

  @Column({ type: 'varchar', length: 255 })
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

  @ManyToOne(() => Carrier, (carrier) => carrier.equipment)
  carrier: Carrier[];

  @ManyToMany(() => Operator, (operator) => operator.equipments)
  @JoinTable({
    name: 'equipments_operators',
    joinColumn: {
      name: 'equipment_id',
    },
    inverseJoinColumn: {
      name: 'operator_id',
    },
  })
  operators: Operator[];

  @OneToMany(() => Pm, (pm) => pm.equipment)
  Pms: Pm[];
}
