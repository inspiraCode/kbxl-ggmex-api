import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Carrier } from './carrier.entity';
import { UnitAvailable } from './unit-available.entity';

@Entity({ name: 'availables' })
export class Available {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'available_comments',
    type: 'varchar',
    length: 510,
    nullable: true,
  })
  availableComments: string;

  @CreateDateColumn({
    name: 'available_date_commit',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  availableDateCommmit: Date;

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

  @OneToMany(() => UnitAvailable, (unitAvailable) => unitAvailable.available)
  unitsAvailable: UnitAvailable[];

  @ManyToOne(() => Carrier, (carrier) => carrier.availables)
  @JoinColumn({ name: 'carrier_id' })
  carrier: Carrier;
}
