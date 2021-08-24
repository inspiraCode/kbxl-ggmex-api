import { Test, TestingModule } from '@nestjs/testing';
import { AvailablesService } from './availables.service';

describe('AvailablesService', () => {
  let service: AvailablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvailablesService],
    }).compile();

    service = module.get<AvailablesService>(AvailablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
