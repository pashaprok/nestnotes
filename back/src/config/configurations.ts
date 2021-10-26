export default () => ({
  PORT: +process.env.PORT || 5000,
  auth: {
    jwt: {
      expire: process.env.JWT_EXPIRE || '1h',
      secret: process.env.JWT_SECRET || 'SUPERSECRETKEY',
    },
    bcrypt: {
      saltRounds: +process.env.JWT_SALT || 12,
    },
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: +process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    fromEmail: process.env.MAIL_FROM,
  },
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});
