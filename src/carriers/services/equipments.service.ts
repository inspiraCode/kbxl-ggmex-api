import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEquipmentDto, UpdateEquipmentDto } from '../dto/equipment.dto';
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

  findAll() {
    return this.equipmentsRepo.find();
  }

  findOne(id: number) {
    return this.equipmentsRepo.findOne(id, {
      relations: ['pm'],
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
