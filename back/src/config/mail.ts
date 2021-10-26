export const mailConfig = {
  host: process.env.MAIL_HOST,
  port: +process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  fromEmail: process.env.MAIL_FROM,
};

// import { registerAs } from '@nestjs/config';
//
// export default registerAs('mailConfig', () => ({
//   host: process.env.MAIL_HOST,
//   port: +process.env.MAIL_PORT,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
//   fromEmail: process.env.MAIL_FROM,
// }));
