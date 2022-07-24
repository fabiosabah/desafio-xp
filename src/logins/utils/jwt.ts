import { sign } from 'jsonwebtoken';

export function generateJwt(contaEntity) {
  return sign(
    {
      CodCliente: contaEntity.id,
      Email: contaEntity.email,
      CarteiraId: contaEntity.id,
    },
    'token_secret',
  );
}
