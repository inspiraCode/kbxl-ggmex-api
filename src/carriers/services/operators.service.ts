import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOperatorDto, UpdateOperatorDto } from '../dto/operator.dto';
import { Operator } from '../entities/operator.entity';

@Injectable()
export class OperatorsService {
  constructor(
    @InjectRepository(Operator) private operatorsRepo: Repository<Operator>,
  ) {}
  async create(createOperatorDto: CreateOperatorDto) {
    const newOperator = await this.operatorsRepo.create(createOperatorDto);

    return this.operatorsRepo.save(newOperator);
  }

  findAll() {
    return this.operatorsRepo.find();
  }

  async findOne(id: number) {
    return this.operatorsRepo.findOne(id);
  }

  async update(id: number, updateOperatorDto: UpdateOperatorDto) {
    const operator = await this.operatorsRepo.findOne(id);
    this.operatorsRepo.merge(operator, updateOperatorDto);
    return this.operatorsRepo.save(operator);
  }

  remove(id: number) {
    return this.operatorsRepo.delete(id);
  }
}
