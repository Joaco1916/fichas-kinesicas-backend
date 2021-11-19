import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ficha } from './entities/ficha.entity';
import { FichaController } from './ficha.controller';
import { FichaService } from './ficha.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Ficha ])
  ],
  controllers: [FichaController],
  providers: [FichaService]
})
export class FichaModule {}
