import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Equal, LessThan, MoreThan, Raw, Repository } from 'typeorm';

import { CreateAvailableDto, UpdateAvailableDto } from '../dto/available.dto';
import { Available } from '../entities/available.entity';
import { Carrier } from '../entities/carrier.entity';

@Injectable()
export class AvailablesService {
  constructor(
    @InjectRepository(Available) private availableRepo: Repository<Available>,
    @InjectRepository(Carrier) private carriersRepo: Repository<Carrier>,
  ) {}

  async create(createAvailable: CreateAvailableDto) {
    const newAvailable = await this.availableRepo.create(createAvailable);

    if (createAvailable.carrierId) {
      const carrier = await this.carriersRepo.findOne(
        createAvailable.carrierId,
      );
      newAvailable.carrier = carrier;
    }

    return this.availableRepo.save(newAvailable);
  }

  findAll() {
    return this.availableRepo.find({
      relations: [
        'carrier',
        'unitsAvailable',
        'unitsAvailable.operator',
        'unitsAvailable.equipment',
      ],
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    return await this.availableRepo.findOne(id, {
      relations: [
        'carrier',
        'unitsAvailable',
        'unitsAvailable.operator',
        'unitsAvailable.equipment',
      ],
      order: {
        id: 'ASC',
      },
    });
  }

  async find(id: number) {
    return await this.availableRepo.find({
      where: { carrier: id },
      order: {
        id: 'DESC',
      },
    });
  }

  async findByCarrierId(id: number) {
    return await this.availableRepo.find({
      where: { carrier: id },
      order: {
        id: 'DESC',
      },
      relations: ['unitsAvailable'],
    });
  }

  async findAvailableDate(startDate, endDate) {
    return await this.availableRepo.find({
      relations: [
        'carrier',
        'unitsAvailable',
        'unitsAvailable.operator',
        'unitsAvailable.equipment',
        'unitsAvailable.equipmentPlataform1',
      ],
      where: {
        availableDateCommmit: Between(startDate, endDate),
      },
    });
  }

  async update(id: number, updateAvailable: UpdateAvailableDto) {
    const available = await this.availableRepo.findOne(id);

    if (updateAvailable.carrierId) {
      const carrier = await this.carriersRepo.findOne(
        updateAvailable.carrierId,
      );
      available.carrier = carrier;
    }

    this.availableRepo.merge(available, updateAvailable);

    return this.availableRepo.save(available);
  }

  remove(id: number) {
    return this.availableRepo.delete(id);
  }
}
