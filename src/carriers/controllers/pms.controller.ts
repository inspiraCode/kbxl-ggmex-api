import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePmDto, UpdatePmDto } from '../dto/pm.dto';
import { PmsService } from '../services/pms.service';

@ApiTags('pms')
@Controller('pms')
export class PmsController {
  constructor(private readonly pmsService: PmsService) {}

  @Post()
  create(@Body() createPmDto: CreatePmDto) {
    return this.pmsService.create(createPmDto);
  }

  @Get()
  findAll() {
    return this.pmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pmsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePmDto: UpdatePmDto,
  ) {
    return this.pmsService.update(id, updatePmDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pmsService.remove(id);
  }
}
