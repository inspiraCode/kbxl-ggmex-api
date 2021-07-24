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
import { UserModule } from 'src/users/users.module';
import { CarriersModule } from 'src/carriers/carriers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, ShipmentByOrder, Route]),
    UserModule,
    CarriersModule,
  ],
  controllers: [OrdersController, ShipmentsByOrderController, RoutesController],
  providers: [OrdersService, ShipmentsByOrderService, RoutesService],
})
export class OrdersModule {}
