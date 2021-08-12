import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateShipmentByOrder,
  FilterShipmentByOrderDto,
  UpdateShipmentByOrderDto,
} from '../dto/shipment-by-order.dto';
import { ShipmentsByOrderService } from '../services/shipments-by-order.service';

@ApiTags('shipments-by-order')
@Controller('shipments-by-order')
export class ShipmentsByOrderController {
  constructor(
    private readonly shipmentByOrdersService: ShipmentsByOrderService,
  ) {}

  @Post()
  create(@Body() createShipmentByOrder: CreateShipmentByOrder) {
    return this.shipmentByOrdersService.create(createShipmentByOrder);
  }

  @Get()
  findAll(@Query() params: FilterShipmentByOrderDto) {
    return this.shipmentByOrdersService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shipmentByOrdersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShipmentByOrderDto: UpdateShipmentByOrderDto,
  ) {
    return this.shipmentByOrdersService.update(id, updateShipmentByOrderDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shipmentByOrdersService.remove(id);
  }
}
