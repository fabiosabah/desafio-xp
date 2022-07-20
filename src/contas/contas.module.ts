import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ContasController],
  providers: [ContasService],
  imports: [PrismaModule],
})
export class ContasModule {}
