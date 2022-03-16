import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/users/services/customers.service';
import { Between, Repository } from 'typeorm';
import {
  CreateOrderDto,
  FilterOrderDto,
  UpdateOrderDto,
} from '../dto/order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(forwardRef(() => CustomersService))
    private customersService: CustomersService,
    @InjectRepository(Order)
    private ordersRepo: Repository<Order>, // @InjectRepository(Customer) private customersRepo: Repository<Customer>,
  ) {}

  async create(data: CreateOrderDto) {
    const newOrder = await this.ordersRepo.create(data);

    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId);
      newOrder.customer = customer;
    }

    return this.ordersRepo.save(newOrder);
  }

  findAll(params: FilterOrderDto) {
    const { limit, page } = params;
    return this.ordersRepo.findAndCount({
      relations: ['customer'],
      order: {
        id: 'DESC',
      },
      take: limit || 0,
      skip: (page - 1) * limit,
    });
  }

  async findOne(id: number) {
    const order = await this.ordersRepo.findOne(id, {
      relations: ['shipmentsByOrder', 'shipmentsByOrder.carrier'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found!`);
    }

    return order;
  }

  async findOrderByDate(startDate, endDate) {
    return await this.ordersRepo.find({
      relations: [
        'shipmentsByOrder',
        'shipmentsByOrder.equipment',
        'shipmentsByOrder.equipmentPlataform1',
        'shipmentsByOrder.route',
      ],
      where: {
        orderDate: Between(startDate, endDate),
      },
      order: { orderDate: 'DESC' },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersRepo.findOne(id);

    this.ordersRepo.merge(order, updateOrderDto);
    return this.ordersRepo.save(order);
  }

  remove(id: number) {
    return this.ordersRepo.delete(id);
  }
}
