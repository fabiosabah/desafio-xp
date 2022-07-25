import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequest } from 'src/types/expressRequest.interface';
import { verify } from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}
  async use(req: ExpressRequest, _res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.cliente = null;
      next();
      return;
    }
    const token = req.headers.authorization;

    try {
      const decode: any = verify(token, 'token_secret');
      const cliente = await this.prisma.carteira.findFirst({
        where: { id: decode.CarteiraId },
      });
      req.cliente = cliente;
      next();
    } catch (error) {
      console.log(error);
      req.cliente = null;
      next();
    }
  }
}
