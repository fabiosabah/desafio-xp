import { sign } from 'jsonwebtoken';

export function generateJwt(contaEntity) {
  return sign(
    {
      CodCliente: contaEntity.id,
      Email: contaEntity.email,
      CarteiraId: contaEntity.id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: '24h', algorithm: 'HS256' },
  );
}