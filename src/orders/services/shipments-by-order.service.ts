import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import readXlsxFile = require('read-excel-file/node');

import {
  CreateShipmentByOrder,
  CreateShipmentsByOrder,
  FilterShipmentByOrderDto,
  UpdateShipmentByOrderDto,
} from '../dto/shipment-by-order.dto';
import { ShipmentByOrder } from '../entities/shipment-by-order.entity';
import { Carrier } from '../../carriers/entities/carrier.entity';
import { Order } from '../entities/order.entity';
import { Route } from '../entities/route.entity';
import { CarriersService } from 'src/carriers/services/carriers.service';

const schema = {
  AppointmentDate: {
    prop: 'appointmentDate',
    type: Date,
  },
  SR: {
    prop: 'shipmentNumber',
    type: String,
  },
  Customer: {
    prop: 'customerName',
    type: String,
  },
  City: {
    prop: 'city',
    type: String,
  },
  State: {
    prop: 'state',
    type: String,
  },
  DeliveryTerms: {
    prop: 'deliveryTerms',
    type: String,
  },
  Carrier: {
    prop: 'ligisticsAgent',
    type: String,
  },
  SRFreight: {
    prop: 'srFreight',
    type: Number,
  },
  OrderFreight: {
    prop: 'orderFreight',
    type: Number,
  },
  TruckType: {
    prop: 'truckType',
    type: String,
  },
  DeliveryDate: {
    prop: 'deliveryDate',
    type: Date,
  },
  TransportStatus: {
    prop: 'transportStatus',
    type: String,
  },
  OrderStatus: {
    prop: 'orderStatus',
    type: String,
  },
  FinancialStatus: {
    prop: 'financialStatus',
    type: String,
  },
  PONumber: {
    prop: 'poNumber',
    type: String,
  },
  GrossWeight: {
    prop: 'weight',
    type: Number,
  },
  TSM: {
    prop: 'TSM',
    type: String,
  },
  SRHeaderComment: {
    prop: 'srHeaderComment',
    type: String,
  },
  OrderHeaderComment: {
    prop: 'orderHeaderComment',
    type: String,
  },
};

const preOrder = `precierre`;

@Injectable()
export class ShipmentsByOrderService {
  constructor(
    @InjectRepository(ShipmentByOrder)
    private shipmentByOrdersRepo: Repository<ShipmentByOrder>,
    @Inject(forwardRef(() => CarriersService))
    private carriersService: CarriersService,
    private connection: Connection,
    // @InjectRepository(Carrier) private carriersRepo: Repository<Carrier>,
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
    @InjectRepository(Route) private routesRepo: Repository<Route>,
  ) {}

  async create(data: CreateShipmentByOrder) {
    const newShipmentByOrder = await this.shipmentByOrdersRepo.create(data);

    if (data.carrierId) {
      const carrier = await this.carriersService.findOne(data.carrierId);
      newShipmentByOrder.carrier = carrier;
    }

    if (data.orderId) {
      const order = await this.ordersRepo.findOne(data.orderId);
      newShipmentByOrder.order = order;
    }

    if (data.routeId) {
      const route = await this.routesRepo.findOne(data.routeId);
      newShipmentByOrder.route = route;
    }

    return await this.shipmentByOrdersRepo.save(newShipmentByOrder);
  }

  async createShipments(shipments: CreateShipmentsByOrder[]) {
    try {
      for await (const shipment of shipments) {
        const res = await this.create(shipment as CreateShipmentByOrder);
        // console.log(res.id);
      }
      // await shipments.map(async (shipment: CreateShipmentByOrder) => {
      //   await this.create(shipment).catch((error) =>
      //     console.log(`Algo salio mal: ${error}`),
      //   );
      // });
      // console.log('Finalizo...');
    } catch (error) {
      return 'algo salio mal...';
    }
  }

  findAll(params: FilterShipmentByOrderDto) {
    const { limit, offset } = params;
    return this.shipmentByOrdersRepo.find({
      relations: ['carrier', 'route', 'order'],
      order: {
        id: 'ASC',
      },
      take: limit || 0,
      skip: offset || 0,
    });
  }

  async findOne(id: number) {
    const shipmentByOrder = await this.shipmentByOrdersRepo.findOne(id, {
      relations: ['carrier', 'route', 'order'],
    });
    if (!shipmentByOrder) {
      throw new NotFoundException(`ShipmentByOrder #${id} not found`);
    }
    return shipmentByOrder;
  }

  async update(id: number, data: UpdateShipmentByOrderDto) {
    const shipmentByOrder = await this.shipmentByOrdersRepo.findOne(id);

    if (data.carrierId) {
      const carrier = await this.carriersService.findOne(data.carrierId);

      shipmentByOrder.carrier = carrier;
    }

    if (data.orderId) {
      const order = await this.ordersRepo.findOne(data.orderId);
      shipmentByOrder.order = order;
    }

    if (data.routeId) {
      const route = await this.routesRepo.findOne(data.routeId);
      shipmentByOrder.route = route;
    }

    this.shipmentByOrdersRepo.merge(shipmentByOrder, data);
    return this.shipmentByOrdersRepo.save(shipmentByOrder);
  }

  remove(id: number) {
    return this.shipmentByOrdersRepo.delete(id);
  }
}
