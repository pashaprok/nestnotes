export const authConfig = {
  jwt: {
    expire: '1h',
    secret: process.env.SECRET_JWT || 'SUPERSECRETKEY',
  },
  bcrypt: {
    saltRounds: 12,
  },
};
