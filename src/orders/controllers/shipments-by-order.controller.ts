import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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

  // @Post('id')
  // createShipmentsExel(
  //   @Body() createShipmentsByOrder: CreateShipmentsByOrder[],
  // ) {
  //   return this.shipmentByOrdersService.createShipments(createShipmentsByOrder);
  // }

  @Post('objs')
  createShipments(
    @Body()
    createShipmentsByOrder: CreateShipmentByOrder[],
  ) {
    return this.shipmentByOrdersService.createShipments(createShipmentsByOrder);
  }

  @Get()
  findAll(@Query() params: FilterShipmentByOrderDto) {
    return this.shipmentByOrdersService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shipmentByOrdersService.findOne(id);
  }

  @Get('order/:id')
  findOneByOrder(@Param('id', ParseIntPipe) id: number) {
    return this.shipmentByOrdersService.findOneByOrder(id);
  }

  @Get('order/:id/carrier/:carrierId')
  findOneByOrderByCarrier(
    @Param('id', ParseIntPipe) id: number,
    @Param('carrierId', ParseIntPipe) carrierId: number,
  ) {
    return this.shipmentByOrdersService.findOneByOrderByCarrier(id, carrierId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShipmentByOrderDto: UpdateShipmentByOrderDto,
  ) {
    return this.shipmentByOrdersService.update(id, updateShipmentByOrderDto);
  }

  @Put('upload-material/:orderId')
  updateShipmentsMaterial(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() updateShipmentsMaterial: UpdateShipmentByOrderDto[],
  ) {
    return this.shipmentByOrdersService.updateShipmentsMaterial(
      orderId,
      updateShipmentsMaterial,
    );
  }

  @Delete('/delete-shipments-by-order')
  removeShipmentsByOrder(@Body() shipmentsByOrder: number[]) {
    return this.shipmentByOrdersService.removeShipmentsByOrder(
      shipmentsByOrder,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shipmentByOrdersService.remove(id);
  }
}
