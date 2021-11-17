import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FichaModule } from './ficha/ficha.module';

@Module({
  imports: [FichaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
