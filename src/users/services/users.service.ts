import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import {
  CreateUserDto,
  FilterUsersDto,
  UpdateUserDto,
} from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Customer) private customersRepo: Repository<Customer>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepo.create(createUserDto);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;

    if (createUserDto.customerId) {
      const customer = await this.customersRepo.findOne(
        createUserDto.customerId,
      );
      newUser.customer = customer;
    }

    return this.usersRepo.save(newUser);
  }

  findAll(params: FilterUsersDto) {
    const { limit, offset } = params;
    return this.usersRepo.find({
      take: limit || 0,
      skip: offset || 0,
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne(id, {
      relations: ['customer'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }
  async findByUsername(userName: string) {
    return await this.usersRepo.findOne({ where: { userName } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepo.findOne(id, {
      relations: ['customer'],
    });

    if (updateUserDto.customerId) {
      const customer = await this.customersRepo.findOne(
        updateUserDto.customerId,
      );
      user.customer = customer;
    }

    this.usersRepo.merge(user, updateUserDto);

    if (updateUserDto.password) {
      const hashPassword = await bcrypt.hash(updateUserDto.password, 10);
      user.password = hashPassword;
    }

    return this.usersRepo.save(user);
  }

  remove(id: number) {
    return this.usersRepo.delete(id);
  }
}
