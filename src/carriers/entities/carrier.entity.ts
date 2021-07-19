import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  // operator relacion

  // equipmet relation
}
