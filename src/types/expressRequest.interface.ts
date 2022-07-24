import { Request } from 'express';
import { ContaEntity } from 'src/contas/entities/conta.entity';

export interface ExpressRequest extends Request {
  cliente?: ContaEntity;
}
