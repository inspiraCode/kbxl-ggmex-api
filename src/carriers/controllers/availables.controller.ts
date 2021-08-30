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
import { CreateAvailableDto, UpdateAvailableDto } from '../dto/available.dto';
import { AvailablesService } from '../services/availables.service';

@ApiTags('availables')
@Controller('availables')
export class AvailablesController {
  constructor(private readonly availableService: AvailablesService) {}

  @Post()
  create(@Body() createAvailable: CreateAvailableDto) {
    return this.availableService.create(createAvailable);
  }

  @Get()
  findAll() {
    return this.availableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.availableService.findOne(id);
  }

  @Get('carrier/:id')
  findByCarrierId(@Param('id', ParseIntPipe) id: number) {
    return this.availableService.findByCarrierId(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAvailable: UpdateAvailableDto,
  ) {
    return this.availableService.update(id, updateAvailable);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.availableService.remove(id);
  }
}
