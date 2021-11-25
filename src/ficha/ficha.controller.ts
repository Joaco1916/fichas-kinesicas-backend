import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { Auth, User } from 'src/common/decorators';
import { User as UserEntity } from 'src/users/entities';
import { CreateFichaDto, UpdateFichaDto } from './dtos';
import { FichaService } from './ficha.service';

@ApiTags('Fichas')
@Controller('ficha')
export class FichaController {

    constructor(
        private readonly fichaService: FichaService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder
    ) {}

    @Get()
    async getFichas() {
        const data = await this.fichaService.getFichas();
        return { data };
    }

    @Get(':id')
    async getFicha(
        @Param('id', ParseIntPipe) id: number
    ){
        const data = this.fichaService.getFicha(id);
        return { data };
    }

    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.FICHA
    })
    @Post()
    async createFicha(
        @Body() dto: CreateFichaDto,
        @User() author: UserEntity
    ){
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
        @User() author: UserEntity
    ){
        let data;

        if(this.rolesBuilder
            .can(author.roles)
            .deleteAny(AppResource.FICHA)
            .granted
        ){
            data = await this.fichaService.editFicha(id, dto);
        } else {
            data = await this.fichaService.editFicha(id, dto, author);
        }
        return {
            message: 'Ficha edited',
            data
        };
        return this.fichaService.editFicha(id, dto);
    }

    @Auth({
        possession: 'own',
        action: 'delete',
        resource: AppResource.FICHA
    })
    @Delete(':id')
    async deleteFicha(
        @Param('id', ParseIntPipe) id: number,
        @User() author: UserEntity
    ){
        let data;

        if(this.rolesBuilder
            .can(author.roles)
            .deleteAny(AppResource.FICHA)
            .granted
        ){
            data = await this.fichaService.deleteFicha(id);
        } else {
            data = await this.fichaService.deleteFicha(id, author);
        }
        return {
            message: 'Ficha deleted',
            data
        };
    }

}
