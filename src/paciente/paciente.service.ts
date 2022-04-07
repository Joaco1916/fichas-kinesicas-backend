import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities';
import { Repository } from 'typeorm';
import { UpdatePacienteDto, CreatePacienteDto } from './dto';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>
  ){}

  async getPacientes(author?: User){
    return await this.pacienteRepository.find()
  }

  async getPaciente(id: number, author?: User){
    const paciente = await this.pacienteRepository.findOne(id);
    return paciente;
  }

  async createPaciente(dto: CreatePacienteDto, author: User){
    const paciente = this.pacienteRepository.create({...dto, author});
    return await this.pacienteRepository.save(paciente);
  }

  async editPaciente(id: number, dto: UpdatePacienteDto, author?: User){
    const paciente = await this.getPaciente(id, author);
    if(!paciente) throw new NotFoundException('Paciente does not exist');
    const editedPaciente = Object.assign(paciente, dto);
    return await this.pacienteRepository.save(editedPaciente);
  }

  async deletePaciente(id: number, author?: User){
    const paciente = await this.getPaciente(id, author);
    return await this.pacienteRepository.remove(paciente);
  }
}
