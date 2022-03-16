import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import {
  CreateOrderDto,
  FilterOrderDto,
  UpdateOrderDto,
} from '../dto/order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @Get()
  findAll(@Query() params: FilterOrderDto) {
    return this.ordersService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }
  @Get('availabeDate/:startDate/between/:endDate')
  findOrderByDate(
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
  ) {
    return this.ordersService.findOrderByDate(startDate, endDate);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
