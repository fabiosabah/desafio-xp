import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { generateJwt } from './utils/jwt';
@Injectable()
export class LoginsService {
  constructor(private prisma: PrismaService) {}

  async login(loginDto): Promise<any> {
    const { email, password } = loginDto;
    const conta = await this.prisma.conta.findUnique({
      where: { email },
    });
    if (!conta) throw new NotFoundException('Email or password does not exist');
    const isPasswordCorrect = await compare(password, conta.password);
    if (!isPasswordCorrect)
      throw new UnprocessableEntityException('Credentials are not valid');
    return {
      token: generateJwt(conta),
    };
  }
}
