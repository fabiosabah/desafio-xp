import { Module } from '@nestjs/common';
import { LoginsService } from './logins.service';
import { LoginsController } from './logins.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [LoginsController],
  providers: [LoginsService],
  imports: [PrismaModule],
})
export class LoginsModule {}
