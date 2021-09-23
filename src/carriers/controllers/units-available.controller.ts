import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  CreateUnitAvailableDto,
  UpdateUnitAvailableDto,
} from '../dto/unit-available.dto';
import { UnitsAvailableService } from '../services/units-available.service';

// @UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('units-available')
@Controller('units-available')
export class UnitsAvailableController {
  constructor(private unitAvailableService: UnitsAvailableService) {}

  @Post()
  create(@Body() createAvailable: CreateUnitAvailableDto) {
    return this.unitAvailableService.create(createAvailable);
  }

  @Get()
  findAll() {
    return this.unitAvailableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.unitAvailableService.findOne(id);
  }

  @Get('available/:id')
  findByAvailableId(@Param('id', ParseIntPipe) id: number) {
    return this.unitAvailableService.findByAvailableId(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAvailable: UpdateUnitAvailableDto,
  ) {
    return this.unitAvailableService.update(id, updateAvailable);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.unitAvailableService.remove(id);
  }
}
