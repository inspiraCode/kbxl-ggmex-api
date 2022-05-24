import { Test, TestingModule } from '@nestjs/testing';
import { MaterialByShipmentService } from './material-by-shipment.service';

describe('MaterialByShipmentService', () => {
  let service: MaterialByShipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialByShipmentService],
    }).compile();

    service = module.get<MaterialByShipmentService>(MaterialByShipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
