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

  @CreateDateColumn({ name: 'start_date', type: 'timestamptz' })
  startDate: Date;

  @CreateDateColumn({ name: 'end_date', type: 'timestamptz' })
  endDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  evidence: FileList[];

  @Column({ type: 'varchar', length: 510 })
  comments: string;

  @ManyToOne(() => Equipment, (equipment) => equipment.operators)
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;
}
