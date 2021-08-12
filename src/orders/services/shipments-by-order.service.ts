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
  FilterShipmentByOrderDto,
  UpdateShipmentByOrderDto,
} from '../dto/shipment-by-order.dto';
import { ShipmentByOrder } from '../entities/shipment-by-order.entity';
import { Carrier } from '../../carriers/entities/carrier.entity';
import { Order } from '../entities/order.entity';
import { Route } from '../entities/route.entity';
import { CarriersService } from 'src/carriers/services/carriers.service';

@Injectable()
export class ShipmentsByOrderService {
  constructor(
    @InjectRepository(ShipmentByOrder)
    private shipmentByOrdersRepo: Repository<ShipmentByOrder>,
    @Inject(forwardRef(() => CarriersService))
    private carriersService: CarriersService,
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

    return this.shipmentByOrdersRepo.save(newShipmentByOrder);
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
