import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'routes' })
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'route_number', type: 'varchar', length: 255 })
  routeNumber: string;

  @Column({ name: 'delivery_customer_name', type: 'varchar', length: 255 })
  deliveryCustomerName: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  state: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ name: 'kilometers', type: 'float4', default: 1 })
  kilometers: number;

  @Column({ name: 'warehouse_load_time', type: 'float4', default: 1 })
  warehouseLoadTime: number;

  @Column({ name: 'time_to_deliver', type: 'float4', default: 1 })
  timeToDeliver: number;

  @Column({ name: 'customer_times_discharge', type: 'float4', default: 1 })
  customerTimesDischarge: number;

  @Column({ name: 'total_hours', type: 'float4', default: 1 })
  totalHours: number;

  @Column({ name: 'total_days', type: 'float4', default: 1 })
  totalDays: number;

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
}
