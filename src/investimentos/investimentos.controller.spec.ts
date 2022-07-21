import { Test, TestingModule } from '@nestjs/testing';
import { InvestimentosController } from './investimentos.controller';
import { InvestimentosService } from './investimentos.service';

describe('InvestimentosController', () => {
  let controller: InvestimentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestimentosController],
      providers: [InvestimentosService],
    }).compile();

    controller = module.get<InvestimentosController>(InvestimentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
