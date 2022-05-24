import { Test, TestingModule } from '@nestjs/testing';
import { MaterialByShipmentController } from './material-by-shipment.controller';

describe('MaterialByShipmentController', () => {
  let controller: MaterialByShipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialByShipmentController],
    }).compile();

    controller = module.get<MaterialByShipmentController>(MaterialByShipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
