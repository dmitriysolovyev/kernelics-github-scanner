import * as dotenv from 'dotenv';
import { Module, Global } from '@nestjs/common';
import { ConfigToken } from '@/modules/config/config.token';

@Global()
@Module({
  providers: [
    {
      provide: ConfigToken,
      useFactory: () => dotenv.config().parsed,
    },
  ],
  exports: [ConfigToken],
})
export class ConfigModule {}
