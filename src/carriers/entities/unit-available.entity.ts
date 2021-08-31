import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Available } from './available.entity';
import { Equipment } from './equipment.entity';
import { Operator } from './operator.entity';

@Entity({ name: 'units_available' })
export class UnitAvailable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'is_available', type: 'boolean', default: true })
  isAvailable: boolean;

  @Column({ type: 'varchar', length: 100, nullable: true })
  reason: string;

  @Column({
    name: 'reason_comments',
    type: 'varchar',
    length: 355,
    nullable: true,
  })
  reasonComments: string;

  @CreateDateColumn({
    name: 'commitment_date',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  commitmentDate: Date;

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

  //relation ship with Available.Entitty
  @ManyToOne(() => Available, (available) => available.unitsAvailable)
  @JoinColumn({ name: 'available_id' })
  available: Available;

  //relation ship with Operator id
  @ManyToOne(() => Operator, (operator) => operator.unitAvailable)
  @JoinColumn({ name: 'operator_id' })
  operator: Operator;

  //relation ship with UnitType id

  @ManyToOne(() => Equipment, (equipment) => equipment.unitAvailable)
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;
}
