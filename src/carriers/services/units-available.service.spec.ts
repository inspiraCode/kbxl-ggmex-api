import { Test, TestingModule } from '@nestjs/testing';
import { UnitsAvailableService } from './units-available.service';

describe('UnitsAvailableService', () => {
  let service: UnitsAvailableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitsAvailableService],
    }).compile();

    service = module.get<UnitsAvailableService>(UnitsAvailableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
