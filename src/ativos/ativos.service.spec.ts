import { Test, TestingModule } from '@nestjs/testing';
import { AtivosService } from './ativos.service';

describe('AtivosService', () => {
  let service: AtivosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtivosService],
    }).compile();

    service = module.get<AtivosService>(AtivosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
