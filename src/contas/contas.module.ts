import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ContasController],
  providers: [ContasService],
  exports: [ContasService],
  imports: [PrismaModule],
})
export class ContasModule {}
