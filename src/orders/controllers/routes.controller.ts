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
  CreateRouteDto,
  FilterRouteDto,
  UpdateRouteDto,
} from '../dto/route.dto';
import { RoutesService } from '../services/routes.service';

@ApiTags('routes')
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @Get()
  findAll(@Query() params: FilterRouteDto) {
    return this.routesService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.routesService.findOne(id);
  }

  @Get('customer/:customerName')
  findOneCustomer(@Param('customerName') customerName: string) {
    return this.routesService.findOneCustomer(customerName);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRouteDto: UpdateRouteDto,
  ) {
    return this.routesService.update(id, updateRouteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.routesService.remove(id);
  }
}
