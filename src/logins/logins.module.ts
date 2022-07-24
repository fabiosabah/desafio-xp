import { Module } from '@nestjs/common';
import { LoginsService } from './logins.service';
import { LoginsController } from './logins.controller';

@Module({
  controllers: [LoginsController],
  providers: [LoginsService],
})
export class LoginsModule {}
