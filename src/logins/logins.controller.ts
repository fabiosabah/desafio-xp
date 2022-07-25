import { Body, Controller, Post, Req } from '@nestjs/common';
import { ExpressRequest } from 'src/types/expressRequest.interface';
import { LoginsService } from './logins.service';

@Controller()
export class LoginsController {
  constructor(private readonly loginsService: LoginsService) {}
  @Post('login')
  async login(@Body() loginDto, @Req() req: ExpressRequest): Promise<any> {
    console.log(req.cliente);
    return this.loginsService.login(loginDto);
  }
}
