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
import { Route } from '../entities/route.entity';

import { CarriersService } from 'src/carriers/services/carriers.service';
import { EquipmentsService } from 'src/carriers/services/equipments.service';

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

    private connection: Connection,
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

  removeShipmentsByOrder(shipmentsByOrder: number[]) {
    return this.shipmentByOrdersRepo.delete(shipmentsByOrder);
  }

  remove(id: number) {
    return this.shipmentByOrdersRepo.delete(id);
  }
}
