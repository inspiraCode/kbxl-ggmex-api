import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCarrierDto, UpdateCarrierDto } from '../dto/carrier.dto';
import { Carrier } from '../entities/carrier.entity';
import { Equipment } from '../entities/equipment.entity';
import { Operator } from '../entities/operator.entity';

@Injectable()
export class CarriersService {
  constructor(
    @InjectRepository(Carrier) private carriersRepo: Repository<Carrier>,
    @InjectRepository(Operator) private operatorsRepo: Repository<Operator>,
    @InjectRepository(Equipment) private equipmentsRepo: Repository<Equipment>,
  ) {}

  async create(createCarrierDto: CreateCarrierDto) {
    const newCarrier = await this.carriersRepo.create(createCarrierDto);

    if (newCarrier.operator) {
      const operator = await this.operatorsRepo.findOne(newCarrier.operator);
      newCarrier.operator = operator;
    }

    if (newCarrier.equipment) {
      const equipment = await this.equipmentsRepo.findOne(newCarrier.equipment);
      newCarrier.equipment = equipment;
    }

    return this.carriersRepo.save(newCarrier);
  }

  findAll() {
    return this.carriersRepo.find({
      order: {
        id: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.carriersRepo.findOne(id);
  }

  async update(id: number, updateCarrierDto: UpdateCarrierDto) {
    const carrier = await this.carriersRepo.findOne(id);

    if (carrier.operator) {
      const operator = await this.operatorsRepo.findOne(carrier.operator);
      carrier.operator = operator;
    }

    if (carrier.equipment) {
      const equipment = await this.equipmentsRepo.findOne(carrier.equipment);
      carrier.equipment = equipment;
    }

    this.carriersRepo.merge(carrier, updateCarrierDto);
    return this.carriersRepo.save(carrier);
  }

  remove(id: number) {
    return this.carriersRepo.delete(id);
  }
}
