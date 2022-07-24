import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginsService {
  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    return loginDto;
  }
}
