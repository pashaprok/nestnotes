import { config } from 'dotenv';
config({ path: `.${process.env.NODE_ENV}.env` });

export const appConfig = {
  PORT: +process.env.PORT || 5000,
};
