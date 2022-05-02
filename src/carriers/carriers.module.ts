import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
import { AvailablesController } from './controllers/availables.controller';
import { UnitsAvailableController } from './controllers/units-available.controller';
import { AvailablesService } from './services/availables.service';
import { UnitsAvailableService } from './services/units-available.service';
import { Available } from './entities/available.entity';
import { UnitAvailable } from './entities/unit-available.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Carrier,
      Operator,
      Equipment,
      Pm,
      Available,
      UnitAvailable,
    ]),
  ],
  controllers: [
    CarriersController,
    OperatorsController,
    EquipmentsController,
    PmsController,
    AvailablesController,
    UnitsAvailableController,
  ],
  providers: [
    CarriersService,
    OperatorsService,
    EquipmentsService,
    PmsService,
    AvailablesService,
    UnitsAvailableService,
  ],
  exports: [CarriersService, EquipmentsService, OperatorsService],
})
export class CarriersModule {}
