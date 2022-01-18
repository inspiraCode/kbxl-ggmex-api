import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateShipmentByOrder,
  CreateShipmentsByOrder,
  FilterShipmentByOrderDto,
  UpdateShipmentByOrderDto,
} from '../dto/shipment-by-order.dto';
import { ShipmentByOrder } from '../entities/shipment-by-order.entity';
import { Order } from '../entities/order.entity';
import { Route } from '../entities/route.entity';

import { CarriersService } from 'src/carriers/services/carriers.service';
import { EquipmentsService } from 'src/carriers/services/equipments.service';

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
    @Inject(forwardRef(() => EquipmentsService))
    private equipmentsService: EquipmentsService,

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
    const { limit, page } = params;
    return this.shipmentByOrdersRepo.findAndCount({
      relations: ['carrier', 'route', 'order'],
      order: {
        id: 'ASC',
      },
      take: limit || 0,
      skip: (page - 1) * limit,
    });
  }

  async findOne(id: number) {
    const shipmentByOrder = await this.shipmentByOrdersRepo.findOne(id, {
      relations: [
        'carrier',
        'route',
        'order',
        'equipment',
        'equipmentPlataform1',
      ],
    });
    if (!shipmentByOrder) {
      throw new NotFoundException(`ShipmentByOrder #${id} not found`);
    }
    return shipmentByOrder;
  }

  async findOneByOrder(id: number) {
    return await this.shipmentByOrdersRepo.find({
      relations: [
        'carrier',
        'route',
        'order',
        'equipment',
        'equipmentPlataform1',
      ],
      where: { order: id },
      order: { id: 'ASC' },
    });
  }

  async update(id: number, data: UpdateShipmentByOrderDto) {
    const shipmentByOrder = await this.shipmentByOrdersRepo.findOne(id);

    this.shipmentByOrdersRepo.merge(shipmentByOrder, data);

    if (data.carrierId) {
      const carrier = await this.carriersService.findOne(data.carrierId);
      shipmentByOrder.carrier = carrier;
    } else if (data.carrierId === null) shipmentByOrder.carrier = null;

    if (data.orderId) {
      const order = await this.ordersRepo.findOne(data.orderId);
      shipmentByOrder.order = order;
    }

    if (data.routeId) {
      const route = await this.routesRepo.findOne(data.routeId);
      shipmentByOrder.route = route;
    }

    if (data.equipmentId) {
      const equipment = await this.equipmentsService.findOne(data.equipmentId);
      shipmentByOrder.equipment = equipment;
    } else if (data.equipmentId === null) shipmentByOrder.equipment = null;

    if (data.equipmentPlataform1Id) {
      const equipmentPlataform1 = await this.equipmentsService.findOne(
        data.equipmentPlataform1Id,
      );
      shipmentByOrder.equipmentPlataform1 = equipmentPlataform1;
    } else if (data.equipmentPlataform1Id === null) {
      shipmentByOrder.equipmentPlataform1 = null;
    }

    return this.shipmentByOrdersRepo.save(shipmentByOrder);
  }

  remove(id: number) {
    return this.shipmentByOrdersRepo.delete(id);
  }
}
