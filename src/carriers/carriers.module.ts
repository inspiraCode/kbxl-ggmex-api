import { Module } from '@nestjs/common';

import { CarriersController } from './controllers/carriers.controller';
import { CarriersService } from './services/carriers.service';
import { Carrier } from './entities/carrier.entity';

import { OperatorsController } from './controllers/operators.controller';
import { OperatorsService } from './services/operators.service';
import { Operator } from './entities/operator.entity';

import { EquipmentsController } from './controllers/equipments.controller';
import { EquipmentsService } from './services/equipments.service';
import { Equipment } from './entities/equipment.entity';

import { PmsController } from './controllers/pms.controller';
import { PmsService } from './services/pms.service';
import { Pm } from './entities/pm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Carrier, Operator, Equipment, Pm])],
  controllers: [
    CarriersController,
    OperatorsController,
    EquipmentsController,
    PmsController,
  ],
  providers: [CarriersService, OperatorsService, EquipmentsService, PmsService],
  exports: [CarriersService],
})
export class CarriersModule {}
