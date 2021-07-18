import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateCustomerDto,
  FilterCustomersDto,
  UpdateCustomerDto,
} from '../dto/customer.dto';
import { CustomersService } from '../services/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createUserDto: CreateCustomerDto) {
    return this.customersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() params: FilterCustomersDto) {
    return this.customersService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }
}
