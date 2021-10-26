export const authConfig = {
  jwt: {
    expire: process.env.JWT_EXPIRE || '1h',
    secret: process.env.JWT_SECRET || 'SUPERSECRETKEY',
  },
  bcrypt: {
    saltRounds: +process.env.JWT_SALT || 12,
  },
};

// import { registerAs } from '@nestjs/config';
//
// export default registerAs('authConfig', () => ({
//   jwt: {
//     expire: process.env.JWT_EXPIRE || '1h',
//     secret: process.env.JWT_SECRET || 'SUPERSECRETKEY',
//   },
//   bcrypt: {
//     saltRounds: +process.env.JWT_SALT || 12,
//   },
// }));
