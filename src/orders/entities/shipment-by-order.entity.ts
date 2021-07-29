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
    name: 'shipment_numner',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  shipmentNumber: string;

  @Column({ name: 'customer_name', type: 'varchar', length: 255 })
  customerName: string;

  @Column({
    name: 'appointment_date',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  appointmentDate: Date;

  @Column({
    name: 'delivery_date',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  deliveryDate: Date;

  @Column({ type: 'float8' })
  weight: number;

  @Column({ name: 'truck_type', type: 'varchar', length: 255 })
  truckType: string;

  @Column({ name: 'sr_comments', type: 'varchar', length: 255 })
  sRcomments: string;

  @Column({ name: 'header_comments', type: 'varchar', length: 510 })
  headerComments: string;

  @Column({ name: 'status', type: 'varchar', length: 100 })
  status: string;

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

  @ManyToOne(() => Order, (order) => order.shipmetsByOrder)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Route)
  @JoinColumn({ name: 'route_id' })
  route: Route;
}
