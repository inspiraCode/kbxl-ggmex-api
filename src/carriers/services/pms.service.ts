import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePmDto, UpdatePmDto } from '../dto/pm.dto';
import { Equipment } from '../entities/equipment.entity';
import { Pm } from '../entities/pm.entity';

@Injectable()
export class PmsService {
  constructor(
    @InjectRepository(Pm) private pmsRepo: Repository<Pm>,
    @InjectRepository(Equipment) private equipmentsRepo: Repository<Equipment>,
  ) {}

  async create(createPmDto: CreatePmDto) {
    const newPm = await this.pmsRepo.create(createPmDto);
    if (createPmDto.equipmentId) {
      const equipment = await this.equipmentsRepo.findOne(
        createPmDto.equipmentId,
      );

      newPm.equipment = equipment;
    }
    return this.pmsRepo.save(newPm);
  }

  findAll() {
    return this.pmsRepo.find();
  }

  findOne(id: number) {
    return this.pmsRepo.findOne(id);
  }

  async update(id: number, updatePmDto: UpdatePmDto) {
    const pm = await this.pmsRepo.findOne(id);
    this.pmsRepo.merge(pm, updatePmDto);
    return this.pmsRepo.save(pm);
  }

  remove(id: number) {
    return this.pmsRepo.delete(id);
  }
}
