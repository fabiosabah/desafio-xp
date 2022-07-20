import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ContasModule } from './contas/contas.module';

@Module({
  imports: [PrismaModule, ContasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
