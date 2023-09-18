import { Test, TestingModule } from '@nestjs/testing';
import { MeowsService } from './meows.service';

describe('MeowsService', () => {
  let service: MeowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeowsService],
    }).compile();

    service = module.get<MeowsService>(MeowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
