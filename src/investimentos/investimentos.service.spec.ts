import { Test, TestingModule } from '@nestjs/testing';
import { InvestimentosService } from './investimentos.service';

describe('InvestimentosService', () => {
  let service: InvestimentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestimentosService],
    }).compile();

    service = module.get<InvestimentosService>(InvestimentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
