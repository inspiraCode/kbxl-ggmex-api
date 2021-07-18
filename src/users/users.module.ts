import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/users.controller';
import { UserService } from './services/users.service';
import { User } from './entities/user.entity';

import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Customer])],
  controllers: [UserController, CustomersController],
  providers: [UserService, CustomersService],
  exports: [UserService],
})
export class UserModule {}
