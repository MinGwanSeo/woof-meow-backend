import { Test, TestingModule } from '@nestjs/testing';
import { WoofsController } from './woofs.controller';

describe('WoofsController', () => {
  let controller: WoofsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WoofsController],
    }).compile();

    controller = module.get<WoofsController>(WoofsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
