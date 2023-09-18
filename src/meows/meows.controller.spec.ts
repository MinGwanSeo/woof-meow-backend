import { Test, TestingModule } from '@nestjs/testing';
import { MeowsController } from './meows.controller';

describe('MeowsController', () => {
  let controller: MeowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeowsController],
    }).compile();

    controller = module.get<MeowsController>(MeowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
