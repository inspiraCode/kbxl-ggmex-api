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

    if (createCarrierDto.operatorsId) {
      const operators = await this.operatorsRepo.findByIds(
        createCarrierDto.operatorsId,
      );
      newCarrier.operators = operators;
    }

    if (createCarrierDto.equipmetsId) {
      const equipments = await this.equipmentsRepo.findByIds(
        createCarrierDto.equipmetsId,
      );
      newCarrier.equipments = equipments;
    }

    return this.carriersRepo.save(newCarrier);
  }

  findAll() {
    return this.carriersRepo.find({
      relations: ['equipments'],
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

    if (updateCarrierDto.operatorsId) {
      const operators = await this.operatorsRepo.findByIds(carrier.operators);
      carrier.operators = operators;
    }

    if (updateCarrierDto.equipmetsId) {
      const equipments = await this.equipmentsRepo.findByIds(
        carrier.equipments,
      );
      carrier.equipments = equipments;
    }

    this.carriersRepo.merge(carrier, updateCarrierDto);
    return this.carriersRepo.save(carrier);
  }

  remove(id: number) {
    return this.carriersRepo.delete(id);
  }
}
