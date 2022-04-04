import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FichaModule } from './ficha/ficha.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as constants from './config/constants';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';
import { PacienteModule } from './paciente/paciente.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>(constants.TYPEORM_CONFIG),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.env'
    }),
    AccessControlModule.forRoles(roles),
    FichaModule,
    UsersModule,
    AuthModule,
    PacienteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
