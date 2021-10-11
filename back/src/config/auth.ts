import { config } from 'dotenv';
config({ path: `.${process.env.NODE_ENV}.env` });

export const authConfig = {
  jwt: {
    expire: process.env.JWT_EXPIRE || '1h',
    secret: process.env.JWT_SECRET || 'SUPERSECRETKEY',
  },
  bcrypt: {
    saltRounds: +process.env.JWT_SALT || 12,
  },
};
