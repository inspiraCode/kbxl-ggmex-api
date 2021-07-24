import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentsByOrderController } from './shipments-by-order.controller';

describe('ShipmentsByOrderController', () => {
  let controller: ShipmentsByOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipmentsByOrderController],
    }).compile();

    controller = module.get<ShipmentsByOrderController>(ShipmentsByOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
