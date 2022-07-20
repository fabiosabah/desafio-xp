import { Injectable } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContasService {
  constructor(private prisma: PrismaService) {}

  create(createContaDto: CreateContaDto) {
    return 'This action adds a new conta';
  }

  findAll() {
    return `This action returns all contas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conta`;
  }

  update(id: number, updateContaDto: UpdateContaDto) {
    return `This action updates a #${id} conta`;
  }

  remove(id: number) {
    return `This action removes a #${id} conta`;
  }
}
