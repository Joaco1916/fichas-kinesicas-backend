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
    //if( key != 'adminJR.') throw new BadRequestException('You are not allow to access this data.');
    return await this.pacienteRepository.find()
    //const pacientes = await this.pacienteRepository.find();
    //  .then( pacientesFinded => pacientesFinded.forEach(paciente => {
    //    return paciente.author.id == author.id ? paciente : null;
    //  }) );
    //return pacientes;
  }

  async getPaciente(id: number, author?: User){
    console.log('the ID', id);
    console.log('the author',author);
    const paciente = await this.pacienteRepository.findOne(id);
    console.log('the paciente',paciente);
        //.then(pacienteFinded => !author ? pacienteFinded : !!pacienteFinded && author.id === pacienteFinded.author.id ? pacienteFinded : null);
    //if(!paciente) throw new NotFoundException('Paciente does not exist');
    return paciente;
  }

  async createPaciente(dto: CreatePacienteDto, author: User){
    const paciente = this.pacienteRepository.create({...dto, author});
    return await this.pacienteRepository.save(paciente);
  }

  async editPaciente(id: number, dto: UpdatePacienteDto, author?: User){
    //const ficha = await this.fichaRepository.findOne(id);
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
