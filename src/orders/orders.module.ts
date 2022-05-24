import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { Order } from './entities/order.entity';

import { ShipmentsByOrderController } from './controllers/shipments-by-order.controller';
import { ShipmentsByOrderService } from './services/shipments-by-order.service';
import { ShipmentByOrder } from './entities/shipment-by-order.entity';

import { RoutesController } from './controllers/routes.controller';
import { RoutesService } from './services/routes.service';
import { Route } from './entities/route.entity';

import { MaterialByShipmentController } from './controllers/material-by-shipment.controller';
import { MaterialByShipmentService } from './services/material-by-shipment.service';
import { MaterialByShipment } from './entities/material-by-shipment.entity';

import { UserModule } from 'src/users/users.module';
import { CarriersModule } from 'src/carriers/carriers.module';
import { ReadFileController } from './controllers/read-file.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      ShipmentByOrder,
      Route,
      MaterialByShipment,
    ]),
    UserModule,
    CarriersModule,
  ],
  controllers: [
    OrdersController,
    ShipmentsByOrderController,
    RoutesController,
    ReadFileController,
    MaterialByShipmentController,
  ],
  providers: [
    OrdersService,
    ShipmentsByOrderService,
    RoutesService,
    MaterialByShipmentService,
  ],
})
export class OrdersModule {}
