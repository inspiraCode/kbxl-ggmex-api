import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import {
  CreateShipmentByOrder,
  CreateShipmentsByOrder,
  FilterShipmentByOrderDto,
  UpdateShipmentByOrderDto,
} from '../dto/shipment-by-order.dto';
import { ShipmentByOrder } from '../entities/shipment-by-order.entity';
import { Order } from '../entities/order.entity';
// import { Route } from '../entities/route.entity';

import { CarriersService } from 'src/carriers/services/carriers.service';
import { EquipmentsService } from 'src/carriers/services/equipments.service';
import { OperatorsService } from 'src/carriers/services/operators.service';
import { RoutesService } from './routes.service';
import { MaterialByShipmentService } from './material-by-shipment.service';

@Injectable()
export class ShipmentsByOrderService {
  constructor(
    @InjectRepository(ShipmentByOrder)
    private shipmentByOrdersRepo: Repository<ShipmentByOrder>,

    @Inject(forwardRef(() => CarriersService))
    private carriersService: CarriersService,

    @Inject(forwardRef(() => OperatorsService))
    private operatorsService: OperatorsService,

    @Inject(forwardRef(() => EquipmentsService))
    private equipmentsService: EquipmentsService,

    @Inject(RoutesService) private routesRepo: RoutesService,
    // @InjectRepository(Route) private routesRepo: Repository<Route>,

    @Inject(MaterialByShipmentService)
    private materialByShipmentService: MaterialByShipmentService,

    @InjectRepository(Order) private ordersRepo: Repository<Order>,

    private connection: Connection,
  ) {}

  async create(data: CreateShipmentByOrder) {
    const newShipmentByOrder = await this.shipmentByOrdersRepo.create(data);

    // orderId is a must
    if (!data.orderId) {
      throw new NotFoundException('Order Not Found.');
    } else {
      const order = await this.ordersRepo.findOne(data.orderId);
      newShipmentByOrder.order = order;
    }

    if (data.carrierId) {
      const carrier = await this.carriersService.findOne(data.carrierId);
      newShipmentByOrder.carrier = carrier;
    }
    if (data.operatorId) {
      const operator = await this.operatorsService.findOne(data.operatorId);
      newShipmentByOrder.operator = operator;
    }

    if (data.routeId) {
      const route = await this.routesRepo.findOne(data.routeId);
      newShipmentByOrder.route = route;
    }

    if (data.shDNumber) {
      const route = await this.routesRepo.findOneShDNumber(data.shDNumber);
      if (!route || route === undefined) newShipmentByOrder.route = null;

      newShipmentByOrder.route = route;
      // console.log(route);
    }

    if (data.equipmentId) {
      const equipment = await this.equipmentsService.findOne(data.equipmentId);
      newShipmentByOrder.equipment = equipment;
    } else if (data.equipmentId === null) newShipmentByOrder.equipment = null;

    if (data.equipmentPlataform1Id) {
      const equipmentPlataform1 = await this.equipmentsService.findOne(
        data.equipmentPlataform1Id,
      );
      newShipmentByOrder.equipmentPlataform1 = equipmentPlataform1;
    } else if (data.equipmentPlataform1Id === null) {
      newShipmentByOrder.equipmentPlataform1 = null;
    }

    return await this.shipmentByOrdersRepo.save(newShipmentByOrder);
  }

  async createShipments(shipments: CreateShipmentsByOrder[]) {
    const queryRunner = this.connection.createQueryRunner();
    let orderId = 0;

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for await (const shipment of shipments) {
        const newShipmentByOrder = await this.shipmentByOrdersRepo.create(
          shipment,
        );
        if (shipment.orderId) {
          orderId = shipment.orderId;
          const order = await this.ordersRepo.findOne(shipment.orderId);
          newShipmentByOrder.order = order;
        }
        if (shipment.shDNumber) {
          const route = await this.routesRepo.findOneShDNumber(
            shipment.shDNumber,
          );
          if (!route || route === undefined) newShipmentByOrder.route = null;

          newShipmentByOrder.route = route;
        }
        queryRunner.manager.save(newShipmentByOrder);
      }

      await queryRunner.commitTransaction();
      return this.findOneByOrder(orderId);
    } catch (error) {
      console.log('rollbackTransaction');
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  // async createShipments(shipments: CreateShipmentsByOrder[]) {
  //   try {
  //     for await (const shipment of shipments) {
  //       const response = await this.create(shipment as CreateShipmentByOrder);
  //     }
  //     // await shipments.map(async (shipment: CreateShipmentByOrder) => {
  //     //   await this.create(shipment).catch((error) =>
  //     //     console.log(`Algo salio mal: ${error}`),
  //     //   );
  //     // });
  //     // console.log('Finalizo...');
  //   } catch (error) {
  //     return 'algo salio mal...';
  //   }
  // }

  findAll(params: FilterShipmentByOrderDto) {
    const { limit, page } = params;
    return this.shipmentByOrdersRepo.findAndCount({
      relations: ['carrier', 'operator', 'route', 'order'],
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
        'operator',
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
        'operator',
        'equipment',
        'equipmentPlataform1',
        'materialByShipment',
      ],
      where: { order: id },
      order: { id: 'ASC' },
    });
  }
  async findOneByOrderByCarrier(id: number, carrierId: number) {
    return await this.shipmentByOrdersRepo.find({
      relations: [
        'carrier',
        'route',
        'order',
        'operator',
        'equipment',
        'equipmentPlataform1',
        'materialByShipment',
      ],
      where: { order: id, carrier: carrierId },
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

    if (data.operatorId) {
      const operator = await this.operatorsService.findOne(data.operatorId);
      shipmentByOrder.operator = operator;
    } else if (data.operatorId === null) shipmentByOrder.operator = null;

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

  async updateShipmentsMaterial(
    orderId: number,
    updateShipmentsMaterial: UpdateShipmentByOrderDto[],
  ) {
    try {
      for await (const shipmentMaterial of updateShipmentsMaterial) {
        const updateShipmentMaterial = await this.shipmentByOrdersRepo.findOne({
          where: {
            shipmentNumber: shipmentMaterial.shipmentNumber,
            order: orderId,
          },
        });
        if (!updateShipmentMaterial || updateShipmentMaterial === undefined) {
          return null;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { shDNumber, shipmentNumber, ...materialShipment } =
          shipmentMaterial;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...restAll } = updateShipmentMaterial;

        this.materialByShipmentService.create({
          ...(materialShipment as any),
          shipmentByOrderId: id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  removeShipmentsByOrder(shipmentsByOrder: number[]) {
    return this.shipmentByOrdersRepo.delete(shipmentsByOrder);
  }

  remove(id: number) {
    return this.shipmentByOrdersRepo.delete(id);
  }
}
