import { Module } from '@nestjs/common';
import { ContasService } from './contas.service';
import { ContasController } from './contas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthGuard } from 'src/common/guards/auth.guard.ts.guard';

@Module({
  controllers: [ContasController],
  providers: [ContasService, AuthGuard],
  exports: [ContasService],
  imports: [PrismaModule],
})
export class ContasModule {}
