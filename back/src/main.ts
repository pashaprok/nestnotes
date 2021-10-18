import { config } from 'dotenv';
config({ path: `.${process.env.NODE_ENV}.env` });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from './pipes/validation.pipe';
import { appConfig } from './config/app';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

async function start() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('NestNotes', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('NestNotes')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(appConfig.PORT, () =>
    console.log(`App started on port: ${appConfig.PORT}`),
  );
}
start();
