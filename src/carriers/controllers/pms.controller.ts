import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  findOne(@Param('id') id: string) {
    return this.pmsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePmDto: UpdatePmDto) {
    return this.pmsService.update(+id, updatePmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pmsService.remove(+id);
  }
}
