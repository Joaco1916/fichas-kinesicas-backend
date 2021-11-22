import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FichaModule } from './ficha/ficha.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as constants from './config/constants';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>(constants.DATABASE_HOST),
        port: parseInt(config.get<string>(constants.DATABASE_PORT), 10),
        username: config.get<string>(constants.DATABASE_USERNAME),
        password: config.get<string>(constants.DATABASE_PASSWORD),
        database: config.get<string>(constants.DATABASE_NAME),
        entities: [__dirname + './**/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    FichaModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
