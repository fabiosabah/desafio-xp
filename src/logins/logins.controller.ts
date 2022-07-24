import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginsService } from './logins.service';

@Controller()
export class LoginsController {
  constructor(private readonly loginsService: LoginsService) {}
  @Post('login')
  async login(@Body() loginDto): Promise<any> {
    return this.loginsService.login(loginDto);
  }
}
