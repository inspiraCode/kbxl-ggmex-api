import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateRouteDto,
  FilterRouteDto,
  UpdateRouteDto,
} from '../dto/route.dto';
import { Route } from '../entities/route.entity';

@Injectable()
export class RoutesService {
  constructor(@InjectRepository(Route) private routesRepo: Repository<Route>) {}

  async create(createRouteDto: CreateRouteDto) {
    const newoute = await this.routesRepo.create(createRouteDto);

    return this.routesRepo.save(newoute);
  }

  findAll(params: FilterRouteDto) {
    const { limit, page } = params;
    return this.routesRepo.findAndCount({
      order: {
        id: 'ASC',
      },
      take: limit || 0,
      skip: (page - 1) * limit,
    });
  }

  async findOne(id: number) {
    const route = await this.routesRepo.findOne(id);
    if (!route) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return route;
  }

  async findOneShDNumber(routeNumber: string) {
    try {
      const route = await this.routesRepo.findOne({
        where: { routeNumber },
      });
      return route;
    } catch (error) {
      // if (error) {
      //   throw new NotFoundException(`Order #${routeNumber} not found`);
      // }
      return null;
    }
  }

  async findOneCustomer(customerName: string) {
    const route = await this.routesRepo.find({
      where: { deliveryCustomerName: customerName },
    });
    if (!route) {
      throw new NotFoundException(`Customer Name #${customerName} not found`);
    }
    return route;
  }

  async update(id: number, updateRouteDto: UpdateRouteDto) {
    const route = await this.routesRepo.findOne(id);

    this.routesRepo.merge(route, updateRouteDto);
    return this.routesRepo.save(route);
  }

  remove(id: number) {
    return this.routesRepo.delete(id);
  }
}
