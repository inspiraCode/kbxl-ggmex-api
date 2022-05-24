import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShipmentByOrder } from './shipment-by-order.entity';

@Entity({ name: 'materials_by_shipment' })
export class MaterialByShipment {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  HTS: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  pedimento: string;

  @Column({ type: 'int', nullable: true })
  paquetes: number;

  @Column({ type: 'int', nullable: true })
  laminas: number;

  @Column({ name: 'peso_neto', type: 'float8', nullable: true })
  pesoNeto: number;

  @Column({ name: 'peso_bruto', type: 'float8', nullable: true })
  pesoBruto: number;

  @ManyToOne(
    () => ShipmentByOrder,
    (shipmentByOrder) => shipmentByOrder.materialByShipment,
  )
  @JoinColumn({ name: 'shipment_by_order_id' })
  shipmentByOrder: ShipmentByOrder;
}
