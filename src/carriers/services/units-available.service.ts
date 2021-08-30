import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUnitAvailableDto,
  UpdateUnitAvailableDto,
} from '../dto/unit-available.dto';
import { Available } from '../entities/available.entity';
import { Equipment } from '../entities/equipment.entity';
import { Operator } from '../entities/operator.entity';
import { UnitAvailable } from '../entities/unit-available.entity';

@Injectable()
export class UnitsAvailableService {
  constructor(
    @InjectRepository(UnitAvailable)
    private unitAvailableRepo: Repository<UnitAvailable>,
    @InjectRepository(Available)
    private availableRepo: Repository<Available>,
    @InjectRepository(Equipment)
    private equipmentRepo: Repository<Equipment>,
    @InjectRepository(Operator)
    private operatorRepo: Repository<Operator>,
  ) {}

  async create(createUnitAvailable: CreateUnitAvailableDto) {
    const newUnitAvailable = await this.unitAvailableRepo.create(
      createUnitAvailable,
    );

    if (createUnitAvailable.availableId) {
      const available = await this.availableRepo.findOne(
        createUnitAvailable.availableId,
      );
      newUnitAvailable.available = available;
    }

    if (createUnitAvailable.equipmentId) {
      const equipment = await this.equipmentRepo.findOne(
        createUnitAvailable.equipmentId,
      );
      newUnitAvailable.equipment = equipment;
    }

    if (createUnitAvailable.operatorId) {
      const operator = await this.operatorRepo.findOne(
        createUnitAvailable.operatorId,
      );
      newUnitAvailable.operator = operator;
    }

    return await this.unitAvailableRepo.save(newUnitAvailable);
  }
  async findAll() {
    return this.unitAvailableRepo.find({
      relations: ['operator', 'equipment'],
      order: {
        id: 'ASC',
      },
    });
  }
  async findOne(id: number) {
    return this.unitAvailableRepo.findOne(id, {
      relations: ['operator', 'equipment'],
    });
  }

  async findByAvailableId(id: number) {
    return this.unitAvailableRepo.find({
      where: { available: id },
      relations: ['operator', 'equipment'],
      order: {
        id: 'DESC',
      },
    });
  }
  async update(id: number, updateUnitAvailable: UpdateUnitAvailableDto) {
    const unitAvailable = await this.unitAvailableRepo.findOne(id);

    if (updateUnitAvailable.availableId) {
      const available = await this.availableRepo.findOne(
        updateUnitAvailable.availableId,
      );
      unitAvailable.available = available;
    }

    if (updateUnitAvailable.equipmentId) {
      const equiment = await this.equipmentRepo.findOne(
        updateUnitAvailable.equipmentId,
      );
      unitAvailable.equipment = equiment;
    }
    if (updateUnitAvailable.operatorId) {
      const operator = await this.operatorRepo.findOne(
        updateUnitAvailable.operatorId,
      );
      unitAvailable.operator = operator;
    }
    this.unitAvailableRepo.merge(unitAvailable, updateUnitAvailable);
    return this.unitAvailableRepo.save(unitAvailable);
  }
  async remove(id: number) {
    return this.unitAvailableRepo.delete(id);
  }
}
