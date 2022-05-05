import { Exclude, Expose } from 'class-transformer';
import { Customer } from 'src/users/entities/customer.entity';
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
import { ShipmentByOrder } from './shipment-by-order.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_number', type: 'varchar', length: 255 })
  OrderNumber: string;

  @Column({
    name: 'order_status',
    type: 'varchar',
    length: 120,
    nullable: true,
    default: 'PRE-CLOSE',
  })
  orderStatus: string;

  @Column({
    name: 'header_comments',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  hederComments: string;

  @Column({ name: 'is_enabled', type: 'boolean', default: true })
  isEnabled: boolean;

  @CreateDateColumn({
    name: 'order_date',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  orderDate: Date;

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

  // @Exclude()
  @OneToMany(() => ShipmentByOrder, (shipments) => shipments.order)
  shipmentsByOrder: ShipmentByOrder[];

  // relation  manyToone with customer (customer_id)
  @Exclude()
  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  // @Expose()
  // get shipments() {
  //   if (this.shipmentsByOrder) {
  //     return this.shipmentsByOrder
  //       .filter((item) => !!item)
  //       .map((item) => ({
  //         ...item,
  //         carrier: item.carrier,
  //       }));
  //   }
  // }

  @Expose()
  get customerName() {
    if (this.customer) {
      return this.customer.customerName;
    }
  }
}
