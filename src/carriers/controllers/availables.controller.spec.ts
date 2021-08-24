import { Test, TestingModule } from '@nestjs/testing';
import { AvailablesController } from './availables.controller';

describe('AvailablesController', () => {
  let controller: AvailablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailablesController],
    }).compile();

    controller = module.get<AvailablesController>(AvailablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
