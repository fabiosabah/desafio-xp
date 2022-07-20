import { Test, TestingModule } from '@nestjs/testing';
import { ContasController } from './contas.controller';
import { ContasService } from './contas.service';

describe('ContasController', () => {
  let controller: ContasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContasController],
      providers: [ContasService],
    }).compile();

    controller = module.get<ContasController>(ContasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
