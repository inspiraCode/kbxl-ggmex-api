import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
