import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FichaModule } from './ficha/ficha.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'myblog_user',
      password: 'myblog_password',
      database: 'myblog_db',
      entities: [__dirname + './**/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    FichaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
