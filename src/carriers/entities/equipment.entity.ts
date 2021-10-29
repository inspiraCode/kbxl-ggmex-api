import { ShipmentByOrder } from 'src/orders/entities/shipment-by-order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
import { UnitAvailable } from './unit-available.entity';

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

  @ManyToOne(() => Carrier, (carrier) => carrier.equipments)
  @JoinColumn({ name: 'carrier_id' })
  carrier: Carrier;

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
  pms: Pm[];

  @OneToMany(() => UnitAvailable, (unitAvailable) => unitAvailable.equipment)
  unitAvailable: UnitAvailable;

  @OneToMany(
    () => ShipmentByOrder,
    (shipmentByOrder) => shipmentByOrder.equipment,
  )
  shipmentByOrder: ShipmentByOrder;
}
