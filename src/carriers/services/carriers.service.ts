import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCarrierDto, UpdateCarrierDto } from '../dto/carrier.dto';
import { Carrier } from '../entities/carrier.entity';

@Injectable()
export class CarriersService {
  constructor(
    @InjectRepository(Carrier) private carriersRepo: Repository<Carrier>,
  ) {}

  create(createCarrierDto: CreateCarrierDto) {
    return 'This action adds a new carrier';
  }

  findAll() {
    return `This action returns all carriers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carrier`;
  }

  update(id: number, updateCarrierDto: UpdateCarrierDto) {
    return `This action updates a #${id} carrier`;
  }

  remove(id: number) {
    return `This action removes a #${id} carrier`;
  }
}
