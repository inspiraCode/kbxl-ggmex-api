import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateOperatorDto,
  FilterOperatorDto,
  UpdateOperatorDto,
} from '../dto/operator.dto';
import { Carrier } from '../entities/carrier.entity';
import { Operator } from '../entities/operator.entity';

@Injectable()
export class OperatorsService {
  constructor(
    @InjectRepository(Operator) private operatorsRepo: Repository<Operator>,
    @InjectRepository(Carrier) private carriersRepo: Repository<Carrier>,
  ) {}
  async create(createOperatorDto: CreateOperatorDto) {
    const newOperator = await this.operatorsRepo.create(createOperatorDto);

    if (createOperatorDto.carrierId) {
      const carrier = await this.carriersRepo.findOne(
        createOperatorDto.carrierId,
      );
      newOperator.carrier = carrier;
    }

    return this.operatorsRepo.save(newOperator);
  }

  findAll(params: FilterOperatorDto) {
    const { limit, page } = params;
    return this.operatorsRepo.findAndCount({
      order: {
        id: 'ASC',
      },
      take: limit || 0,
      skip: (page - 1) * limit,
    });
  }

  async findOne(id: number) {
    return this.operatorsRepo.findOne(id);
  }

  async findOperatorByCarrier(id: number, params: FilterOperatorDto) {
    const { limit, page } = params;
    return this.operatorsRepo.findAndCount({
      where: { carrier: id },
      order: {
        id: 'ASC',
      },
      take: limit || 0,
      skip: (page - 1) * limit,
    });
  }

  async update(id: number, updateOperatorDto: UpdateOperatorDto) {
    const operator = await this.operatorsRepo.findOne(id, {
      relations: ['carrier'],
    });

    if (updateOperatorDto.carrierId) {
      const carrier = await this.carriersRepo.findOne(
        updateOperatorDto.carrierId,
      );
      operator.carrier = carrier;
    }

    this.operatorsRepo.merge(operator, updateOperatorDto);
    return this.operatorsRepo.save(operator);
  }

  remove(id: number) {
    return this.operatorsRepo.delete(id);
  }
}
