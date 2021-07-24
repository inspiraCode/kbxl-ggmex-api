import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Equipment } from './equipment.entity';

@Entity({ name: 'pms' })
export class Pm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'start_date',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  startDate: Date;

  @Column({
    name: 'end_date',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  endDate: Date;

  @Column({ type: 'varchar', length: 255 })
  evidence: FileList[];

  @Column({ type: 'varchar', length: 510 })
  comments: string;

  @ManyToOne(() => Equipment, (equipment) => equipment.pms)
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;
}
