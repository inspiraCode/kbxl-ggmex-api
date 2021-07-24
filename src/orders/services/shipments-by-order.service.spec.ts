import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentsByOrderService } from './shipments-by-order.service';

describe('ShipmentsByOrderService', () => {
  let service: ShipmentsByOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipmentsByOrderService],
    }).compile();

    service = module.get<ShipmentsByOrderService>(ShipmentsByOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
