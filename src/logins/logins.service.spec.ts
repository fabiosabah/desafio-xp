import { Test, TestingModule } from '@nestjs/testing';
import { LoginsService } from './logins.service';

describe('LoginsService', () => {
  let service: LoginsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginsService],
    }).compile();

    service = module.get<LoginsService>(LoginsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
