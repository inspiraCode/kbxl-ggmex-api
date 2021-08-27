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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOperatorDto, UpdateOperatorDto } from '../dto/operator.dto';
import { OperatorsService } from '../services/operators.service';

@ApiTags('operators')
@Controller('operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Post()
  create(@Body() createOperatorDto: CreateOperatorDto) {
    return this.operatorsService.create(createOperatorDto);
  }

  @Get()
  findAll() {
    return this.operatorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.operatorsService.findOne(id);
  }

  @Get('carrier/:id')
  findOperatorByCarrier(@Param('id', ParseIntPipe) id: number) {
    return this.operatorsService.findOperatorByCarrier(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOperatorDto: UpdateOperatorDto,
  ) {
    return this.operatorsService.update(id, updateOperatorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.operatorsService.remove(id);
  }
}
