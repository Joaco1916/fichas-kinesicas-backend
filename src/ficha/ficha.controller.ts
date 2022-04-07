import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { Auth, User } from 'src/common/decorators';
import { User as UserEntity } from 'src/users/entities';
import { CreateFichaDto, UpdateFichaDto } from './dtos';
import { FichaService } from './ficha.service';
import { Paciente as PacienteEntity } from 'src/paciente/entities';
import { PacienteService } from 'src/paciente/paciente.service';

@ApiTags('Fichas')
@Controller('ficha')
export class FichaController {

    constructor(
        private readonly fichaService: FichaService,
        private readonly pacienteService: PacienteService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder
    ) {}

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.FICHA
    })
    @Get()
    async getFichas(
        @User() author: UserEntity
    ) {
        const data = await this.fichaService.getFichas(author);
        const fichas = data.map( (ficha) => {
            return ficha.author.author.id == author.id ? ficha : null;
          } ).filter((ficha) => {
            return ficha != null
          } );
        return { fichas };
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.FICHA
    })
    @Get(':id')
    async getFicha(
        @Param('id', ParseIntPipe) id: number
    ){
        const data = await this.fichaService.getFicha(id);
        return { data };
    }

    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.FICHA
    })
    @Post(':id')
    async createFicha(
        @Body() dto: CreateFichaDto,
        @Param('id', ParseIntPipe) id: number
    ){
        const author = await this.pacienteService.getPaciente(id);
        console.log(author);
        const data = await this.fichaService.createFicha(dto, author);
        return {
            message: 'Ficha created',
            data
        };
    }

    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.FICHA
    })
    @Put(':id')
    async editFicha(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateFichaDto,
        @User() author: PacienteEntity
    ){
        let data = await this.fichaService.editFicha(id, dto, author);
        return {
            message: 'Ficha edited',
            data
        };
    }

    @Auth({
        possession: 'own',
        action: 'delete',
        resource: AppResource.FICHA
    })
    @Delete(':id')
    async deleteFicha(
        @Param('id', ParseIntPipe) id: number,
        @User() author: PacienteEntity
    ){
        let data = await this.fichaService.deleteFicha(id, author);
        return {
            message: 'Ficha deleted',
            data
        };
    }

}
