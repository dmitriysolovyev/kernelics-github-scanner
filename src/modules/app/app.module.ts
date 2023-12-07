import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlThrottlerGuard } from '@/guards/graphql';
import { ConfigModule } from '@/modules/config/config.module';
import { ConfigToken } from '@/modules/config/config.token';
import { Config } from '@/modules/config/config.entity';
import { RepositoriesModule } from '@/modules/repositories/repositories.module';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigToken],
      useFactory: (config: Config) => {
        return [
          {
            ttl: config.THROTTLE_TTL,
            limit: config.THROTTLE_LIMIT,
          },
        ];
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    ConfigModule,
    RepositoriesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
