import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateEquipmentDto,
  FilterEquipmentDto,
  UpdateEquipmentDto,
} from '../dto/equipment.dto';
import { Equipment } from '../entities/equipment.entity';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment) private equipmentsRepo: Repository<Equipment>,
  ) {}
  async create(createEquipmentDto: CreateEquipmentDto) {
    const newEquipment = await this.equipmentsRepo.create(createEquipmentDto);

    return this.equipmentsRepo.save(newEquipment);
  }

  findAll(params: FilterEquipmentDto) {
    const { limit, offset } = params;
    return this.equipmentsRepo.find({
      take: limit || 0,
      skip: offset || 0,
    });
  }

  findOne(id: number) {
    return this.equipmentsRepo.findOne(id, {
      relations: ['pms'],
    });
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    const equipment = await this.equipmentsRepo.findOne(id);
    this.equipmentsRepo.merge(equipment, updateEquipmentDto);
    return this.equipmentsRepo.save(equipment);
  }

  async addOperatorToEquipment() {
    //
  }

  remove(id: number) {
    return this.equipmentsRepo.delete(id);
  }
}
