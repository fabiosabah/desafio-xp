import { sign, verify } from 'jsonwebtoken';

export function generateJwt(contaEntity) {
  return sign(
    {
      CodCliente: contaEntity.id,
      Email: contaEntity.email,
      CarteiraId: contaEntity.id,
    },
    'token_secret',
    { expiresIn: '24h', algorithm: 'HS256' },
  );
}

export function decoded(token) {
  return verify(token, 'token_secret');
}
