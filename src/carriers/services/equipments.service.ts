import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateEquipmentDto,
  FilterEquipmentDto,
  UpdateEquipmentDto,
} from '../dto/equipment.dto';
import { Carrier } from '../entities/carrier.entity';
import { Equipment } from '../entities/equipment.entity';
import { Operator } from '../entities/operator.entity';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment) private equipmentsRepo: Repository<Equipment>,
    @InjectRepository(Carrier) private carriersRepo: Repository<Carrier>,
    @InjectRepository(Operator) private operatorsRepo: Repository<Operator>,
  ) {}
  async create(createEquipmentDto: CreateEquipmentDto) {
    const newEquipment = await this.equipmentsRepo.create(createEquipmentDto);

    if (createEquipmentDto.carrierId) {
      const carrier = await this.carriersRepo.findOne(
        createEquipmentDto.carrierId,
      );
      newEquipment.carrier = carrier;
    }

    if (createEquipmentDto.operatorsIds) {
      const operators = await this.operatorsRepo.findByIds(
        createEquipmentDto.operatorsIds,
      );
      newEquipment.operators = operators;
    }

    return this.equipmentsRepo.save(newEquipment);
  }

  findAll(params: FilterEquipmentDto) {
    const { limit, page } = params;
    return this.equipmentsRepo.findAndCount({
      relations: ['carrier'],
      order: {
        id: 'ASC',
      },
      take: limit || 0,
      skip: (page - 1) * limit,
    });
  }

  findOne(id: number) {
    return this.equipmentsRepo.findOne(id, {
      relations: ['carrier', 'pms'],
    });
  }

  findOneByCarrier(id: number, params: FilterEquipmentDto) {
    const { limit, page } = params;
    return this.equipmentsRepo.findAndCount({
      where: { carrier: id },
      order: {
        id: 'ASC',
      },
      take: limit || 0,
      skip: (page - 1) * limit,
    });
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    const equipment = await this.equipmentsRepo.findOne(id, {
      relations: ['carrier'],
    });

    if (updateEquipmentDto.carrierId) {
      const carrier = await this.carriersRepo.findOne(
        updateEquipmentDto.carrierId,
      );
      equipment.carrier = carrier;
    }
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
