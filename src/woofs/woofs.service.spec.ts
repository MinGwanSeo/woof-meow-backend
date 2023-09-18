import { Test, TestingModule } from '@nestjs/testing';
import { WoofsService } from './woofs.service';

describe('WoofsService', () => {
  let service: WoofsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WoofsService],
    }).compile();

    service = module.get<WoofsService>(WoofsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
