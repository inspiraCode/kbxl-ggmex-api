import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateCustomerDto,
  FilterCustomersDto,
  UpdateCustomerDto,
} from '../dto/customer.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customersRepo: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const newUser = await this.customersRepo.create(createCustomerDto);

    return this.customersRepo.save(newUser);
  }

  findAll(params: FilterCustomersDto) {
    const { limit, offset } = params;
    return this.customersRepo.find({
      take: limit || 0,
      skip: offset || 0,
    });
  }

  async findOne(id: number) {
    const customer = await this.customersRepo.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customersRepo.findOne(id);
    this.customersRepo.merge(customer, updateCustomerDto);

    return this.customersRepo.save(customer);
  }

  remove(id: number) {
    return this.customersRepo.delete(id);
  }
}
