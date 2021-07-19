import { Injectable } from '@nestjs/common';
import { CreateOperatorDto, UpdateOperatorDto } from '../dto/operator.dto';

@Injectable()
export class OperatorsService {
  create(createOperatorDto: CreateOperatorDto) {
    return 'This action adds a new operator';
  }

  findAll() {
    return `This action returns all operators`;
  }

  findOne(id: number) {
    return `This action returns a #${id} operator`;
  }

  update(id: number, updateOperatorDto: UpdateOperatorDto) {
    return `This action updates a #${id} operator`;
  }

  remove(id: number) {
    return `This action removes a #${id} operator`;
  }
}
