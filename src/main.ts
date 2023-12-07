import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from '@/modules/app/app.module';
import { ConfigToken } from '@/modules/config/config.token';
import { Config } from '@/modules/config/config.entity';

async function bootstrap() {
  const logger = new Logger('GitHub Scanner');
  const app = await NestFactory.create(AppModule);

  const config = app.get<Config>(ConfigToken);
  // TODO set up logger level from config

  await app.listen(config.GRAPHQL_PORT);
  logger.log(`GraphQL is listening on port: ${config.GRAPHQL_PORT}`);
}

bootstrap();
