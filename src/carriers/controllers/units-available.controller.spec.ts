import { Test, TestingModule } from '@nestjs/testing';
import { UnitsAvailableController } from './units-available.controller';

describe('UnitsAvailableController', () => {
  let controller: UnitsAvailableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitsAvailableController],
    }).compile();

    controller = module.get<UnitsAvailableController>(UnitsAvailableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
