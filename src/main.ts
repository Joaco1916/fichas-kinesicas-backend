import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import * as constants from './config/constants'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const config = app.get(ConfigService);
  const port = parseInt(config.get<string>(constants.SERVER_PORT), 10);

  initSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(port);
  logger.log(`Server is running in ${ await app.getUrl()}`);
}
bootstrap();
