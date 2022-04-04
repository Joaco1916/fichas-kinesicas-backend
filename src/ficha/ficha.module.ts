import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from 'src/paciente/entities';
import { PacienteController } from 'src/paciente/paciente.controller';
import { PacienteService } from 'src/paciente/paciente.service';
import { Ficha } from './entities/ficha.entity';
import { FichaController } from './ficha.controller';
import { FichaService } from './ficha.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Ficha, Paciente ])
  ],
  controllers: [FichaController, PacienteController],
  providers: [FichaService, PacienteService]
})
export class FichaModule {}
