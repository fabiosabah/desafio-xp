import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExpressRequest } from 'src/types/expressRequest.interface';
import { LoginDto } from './dto/login.dto';
import { LoginsService } from './logins.service';

@Controller()
export class LoginsController {
  constructor(private readonly loginsService: LoginsService) {}
  @Post('login')
  @ApiTags('Login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: ExpressRequest,
  ): Promise<any> {
    console.log(req.cliente);
    return this.loginsService.login(loginDto);
  }
}
