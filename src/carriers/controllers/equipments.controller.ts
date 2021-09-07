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
  CreateEquipmentDto,
  FilterEquipmentDto,
  UpdateEquipmentDto,
} from '../dto/equipment.dto';
import { EquipmentsService } from '../services/equipments.service';

@ApiTags('equipments')
@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentsService.create(createEquipmentDto);
  }

  @Get()
  findAll(@Query() params: FilterEquipmentDto) {
    return this.equipmentsService.findAll(params);
  }

  @Get('carrier/:id')
  findOneByCarrier(
    @Param('id', ParseIntPipe) id: number,
    @Query() params: FilterEquipmentDto,
  ) {
    return this.equipmentsService.findOneByCarrier(id, params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentsService.update(id, updateEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.equipmentsService.remove(id);
  }
}
