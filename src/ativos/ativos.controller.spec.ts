import { Test, TestingModule } from '@nestjs/testing';
import { AtivosController } from './ativos.controller';
import { AtivosService } from './ativos.service';

describe('AtivosController', () => {
  let controller: AtivosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtivosController],
      providers: [AtivosService],
    }).compile();

    controller = module.get<AtivosController>(AtivosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
