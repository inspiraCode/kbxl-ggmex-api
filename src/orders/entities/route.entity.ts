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

  @Column({ name: 'trip_type', type: 'varchar', length: 25, nullable: true })
  tripType: string;

  @Column({ name: 'delivery_customer_name', type: 'varchar', length: 255 })
  deliveryCustomerName: string;

  @Column({
    name: 'razon_social',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  razonSocial: string;

  @Column({ name: 'rfc', type: 'varchar', length: 255, nullable: true })
  rfc: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  state: string;

  @Column({ name: 'zip_code', type: 'varchar', length: 255, nullable: true })
  zipCode: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ name: 'kilometers', type: 'float4', default: 1 })
  kilometers: number;

  @Column({ type: 'varchar', length: 550, nullable: true })
  comments: string;

  @Column({ name: 'priority_flag', type: 'boolean', default: false })
  priorityFlag: boolean;

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

  @Column({ name: 'caballete_28_ton', type: 'float', default: 0 })
  caballete28Ton: number;
  @Column({ name: 'tolls_28_ton', type: 'float', default: 0 })
  tolls28Ton: number;

  @Column({ name: 'caballete_30_ton', type: 'float', default: 0 })
  caballete30Ton: number;
  @Column({ name: 'tolls_30_ton', type: 'float', default: 0 })
  tolls30Ton: number;

  @Column({ name: 'caballete_32_ton', type: 'float', default: 0 })
  caballete32Ton: number;
  @Column({ name: 'tolls_32_ton', type: 'float', default: 0 })
  tolls32Ton: number;

  @Column({ name: 'low_boy_24_ton', type: 'float', default: 0 })
  lowBoy24Ton: number;
  @Column({ name: 'tolls_24_ton', type: 'float', default: 0 })
  tolls24Ton: number;

  @Column({ name: 'low_bed_32_ton', type: 'float', default: 0 })
  lowBed32Ton: number;
  @Column({ name: 'tolls_low_bed_32_ton', type: 'float', default: 0 })
  tollsLowBed32Ton: number;

  @Column({ name: 'low_bed_28_ton', type: 'float', default: 0 })
  lowBed28Ton: number;
  @Column({ name: 'tolls_low_bed_28_ton', type: 'float', default: 0 })
  tollsLowBed28Ton: number;

  @Column({ name: 'torton_16_ton', type: 'float', default: 0 })
  torton16Ton: number;
  @Column({ name: 'tolls_16_ton', type: 'float', default: 0 })
  tolls16Ton: number;

  @Column({ name: 'torton_18_ton', type: 'float', default: 0 })
  torton18Ton: number;
  @Column({ name: 'tolls_18_ton', type: 'float', default: 0 })
  tolls18Ton: number;

  // These fields will be in another file and then we need to extends from that file

  @Column({ name: 'is_enabled', type: 'boolean', default: true })
  isEnabled: boolean;

  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ name: 'created_by', type: 'varchar', length: 80, nullable: true })
  createdBy: string;

  @Column({ name: 'updated_by', type: 'varchar', length: 80, nullable: true })
  updatedBy: string;

  @Column({ name: 'deleted_by', type: 'varchar', length: 80, nullable: true })
  deletedBy: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;
}
