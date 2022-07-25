import { Test, TestingModule } from '@nestjs/testing';
import { LoginsController } from './logins.controller';
import { LoginsService } from './logins.service';

describe('LoginsController', () => {
  let controller: LoginsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginsController],
      providers: [LoginsService],
    }).compile();

    controller = module.get<LoginsController>(LoginsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
