import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APP_PORT } from './utils/Const';
import bodyParser = require('body-parser');
import winston = require('winston');
import cors = require('cors');

winston.configure({
  transports: [new winston.transports.File({ filename: 'log/logger.log' })],
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
  });

  //app.use(cors());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Guihon job')
    .setDescription('')
    .setVersion('0.0.1')
    .addTag('guihon, job')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  await app.listen(APP_PORT);
}
bootstrap();
