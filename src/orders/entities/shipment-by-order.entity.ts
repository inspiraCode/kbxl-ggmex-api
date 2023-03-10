import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Operator } from 'src/carriers/entities/operator.entity';
import { Route } from './route.entity';
import { Carrier } from '../../carriers/entities/carrier.entity';
import { Equipment } from 'src/carriers/entities/equipment.entity';
import { MaterialByShipment } from './material-by-shipment.entity';

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
  })
  shipmentNumber: string;

  @Column({
    name: 'sh_d_number',
    type: 'varchar',
    length: 255,
    default: null,
  })
  shDNumber: string;

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

  @Column({
    name: 'clave_SAT',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  claveSAT: string;

  @Column({
    name: 'descripcion_SAT',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  descripcionSAT: string;

  @Column({ type: 'int', nullable: true })
  paquetes: number;

  @Column({ type: 'int', nullable: true })
  laminas: number;

  @Column({ name: 'peso_neto', type: 'float8', nullable: true })
  pesoNeto: number;

  @Column({ name: 'peso_bruto', type: 'float8', nullable: true })
  pesoBruto: number;

  @Column({ name: 'tsm', type: 'varchar', length: 255, nullable: true })
  TSM: string;

  @Column({
    name: 'kbx_comments',
    type: 'varchar',
    length: 510,
    nullable: true,
  })
  kbxComments: string;

  @Column({
    name: 'sat_comments',
    type: 'varchar',
    length: 510,
    nullable: true,
  })
  satComments: string;

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

  @Column({
    name: 'cancelation_reason',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  cancelationReason: string;

  @Column({
    name: 'cancelation_variable',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  cancelationVariable: string;

  @Column({ name: 'is_enabled', type: 'boolean', default: true })
  isEnabled: boolean;

  @Column({ name: 'is_cancel', type: 'boolean', default: false })
  isCancel: boolean;

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

  @ManyToOne(() => Carrier, (carrier) => carrier.shipments)
  @JoinColumn({ name: 'carrier_id' })
  carrier: Carrier;

  @ManyToOne(() => Operator)
  @JoinColumn({ name: 'operator_id' })
  operator: Operator;

  @ManyToOne(() => Order, (order) => order.shipmentsByOrder)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Route)
  @JoinColumn({ name: 'route_id' })
  route: Route;

  @ManyToOne(() => Equipment, (equipment) => equipment.shipmentByOrder)
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;

  @ManyToOne(() => Equipment, (equipment) => equipment.shipmentByOrder)
  @JoinColumn({ name: 'equipment_plataform_1_id' })
  equipmentPlataform1: Equipment;

  @OneToMany(
    () => MaterialByShipment,
    (materialByShipment) => materialByShipment.shipmentByOrder,
  )
  materialByShipment: MaterialByShipment[];
}
