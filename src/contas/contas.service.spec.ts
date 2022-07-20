import { Test, TestingModule } from '@nestjs/testing';
import { ContasService } from './contas.service';

describe('ContasService', () => {
  let service: ContasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContasService],
    }).compile();

    service = module.get<ContasService>(ContasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
