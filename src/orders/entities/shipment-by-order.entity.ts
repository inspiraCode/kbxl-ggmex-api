import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Route } from './route.entity';
import { Carrier } from '../../carriers/entities/carrier.entity';

@Entity({ name: 'shipments_by_orders' })
export class ShipmentByOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'appointment_date',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  appointmentDate: Date;

  @Column({
    name: 'shipment_numner',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  shipmentNumber: string;

  @Column({ name: 'customer_name', type: 'varchar', length: 255 })
  customerName: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255, default: 'Activo' })
  state: string;

  @Column({
    name: 'delivery_terms',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  deliveryTerms: string;

  @Column({
    name: 'ligistics_agent',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  ligisticsAgent: string;

  @Column({ name: 'sr_freight', type: 'float8', nullable: true })
  srFreight: number;

  @Column({ name: 'order_freight', type: 'float8', nullable: true })
  orderFreight: number;

  @Column({ name: 'truck_type', type: 'varchar', length: 255 })
  truckType: string;

  @Column({
    name: 'delivery_date',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  deliveryDate: Date;

  @Column({
    name: 'transport_status',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  transportStatus: string;

  @Column({
    name: 'order_status',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  orderStatus: string;

  @Column({
    name: 'financial_status',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  financialStatus: string;

  @Column({ type: 'float8' })
  weight: number;

  @Column({ name: 'tsm', type: 'varchar', length: 255, nullable: true })
  TSM: string;

  @Column({
    name: 'sr_header_comments',
    type: 'varchar',
    length: 510,
    nullable: true,
  })
  srHeaderComments: string;

  @Column({
    name: 'order_header_comment',
    type: 'varchar',
    length: 510,
    nullable: true,
  })
  orderHeaderComment: string;

  @Column({ name: 'cancelation_reazon', type: 'varchar', nullable: true })
  cancelationReason: string;

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

  @ManyToOne(() => Carrier, (carrier) => carrier.shipments)
  @JoinColumn({ name: 'carrier_id' })
  carrier: Carrier;

  @ManyToOne(() => Order, (order) => order.shipmentsByOrder)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Route)
  @JoinColumn({ name: 'route_id' })
  route: Route;
}
