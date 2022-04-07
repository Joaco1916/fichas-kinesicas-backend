import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { CreatePacienteDto, UpdatePacienteDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { Auth, User } from 'src/common/decorators';
import { AppResource } from 'src/app.roles';
import { User as UserEntity } from 'src/users/entities';
import { UsersService } from 'src/users/users.service';

@ApiTags('Pacientes')
@Controller('pacientes')
export class PacienteController {
  constructor(
    private readonly pacienteService: PacienteService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder
  ) {}

  @Auth({
    possession: 'own',
    action: 'read',
    resource: AppResource.PACIENTE
  })
  @Get()
  async getPacientes(
    @User() author: UserEntity
  ) {
      const data = await this.pacienteService.getPacientes(author);
      const pacientes = data.map( (paciente) => {
        return paciente.author.id == author.id ? paciente : null;
      } ).filter((paciente) => {
        return paciente != null
      } );
      return { pacientes };
  }

  @Auth({
    possession: 'own',
    action: 'read',
    resource: AppResource.PACIENTE
  })
  @Get(':id')
  async getPaciente(
      @Param('id', ParseIntPipe) id: number,
      @User() author: UserEntity
  ){
      const data = await this.pacienteService.getPaciente(id, author);
      return { data };
  }

  @Auth({
    possession: 'own',
    action: 'create',
    resource: AppResource.PACIENTE
  })
  @Post()
  async createPaciente(
      @Body() dto: CreatePacienteDto,
      @User() author: UserEntity
  ){
      const data = await this.pacienteService.createPaciente(dto, author);
      return {
          message: 'Paciente created',
          data
      };
  }

  @Auth({
      possession: 'own',
      action: 'update',
      resource: AppResource.PACIENTE
  })
  @Put(':id')
  async editPaciente(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdatePacienteDto,
      @User() author: UserEntity
  ){
      let data;

      if(this.rolesBuilder
          .can(author.roles)
          .deleteAny(AppResource.PACIENTE)
          .granted
      ){
          data = await this.pacienteService.editPaciente(id, dto);
      } else {
          data = await this.pacienteService.editPaciente(id, dto, author);
      }
      return {
          message: 'Paciente edited',
          data
      };
  }

  @Auth({
      possession: 'own',
      action: 'delete',
      resource: AppResource.PACIENTE
  })
  @Delete(':id')
  async deletePaciente(
      @Param('id', ParseIntPipe) id: number,
      @User() author: UserEntity
  ){
      let data;

      if(this.rolesBuilder
          .can(author.roles)
          .deleteAny(AppResource.PACIENTE)
          .granted
      ){
          data = await this.pacienteService.deletePaciente(id);
      } else {
          data = await this.pacienteService.deletePaciente(id, author);
      }
      return {
          message: 'Paciente deleted',
          data
      };
  }
}
