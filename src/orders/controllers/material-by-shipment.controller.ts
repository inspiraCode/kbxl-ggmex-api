import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateMaterialByShipmentDto,
  UpdateMaterialByShipmentDto,
} from '../dto/material-by-shipment.dto';

import { MaterialByShipmentService } from '../services/material-by-shipment.service';

@ApiTags('material-by-shipment')
@Controller('material-by-shipment')
export class MaterialByShipmentController {
  constructor(
    private readonly materialByShipmentService: MaterialByShipmentService,
  ) {}

  @Post()
  create(@Body() createData: CreateMaterialByShipmentDto) {
    return this.materialByShipmentService.create(createData);
  }

  @Get()
  findAll() {
    return this.materialByShipmentService.findAll();
  }

  @Get()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.materialByShipmentService.findOne(id);
  }

  @Put(':id')
  Update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateMaterialByShipmentDto,
  ) {
    return this.materialByShipmentService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.materialByShipmentService.remove(id);
  }
}
