import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateFichaDto, UpdateFichaDto } from './dtos';
import { FichaService } from './ficha.service';

@ApiTags('Fichas')
@Controller('ficha')
export class FichaController {

    constructor(private readonly fichaService: FichaService) {}

    @Get()
    async getFichas() {
        const fichas = await this.fichaService.getFichas();
        return {
            message: 'Petición correcta',
            data: fichas //Podriamos poner "fichas" solo
        }
    }

    @Get(':id')
    getFicha(
        @Param('id', ParseIntPipe) id: number
    ){
        return this.fichaService.getFicha(id);
    }

    @Post()
    createFicha(
        @Body() dto: CreateFichaDto
    ){
        return this.fichaService.createFicha(dto);
    }

    @Put(':id')
    editFicha(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateFichaDto
    ){
        return this.fichaService.editFicha(id, dto);
    }

    @Delete(':id')
    deleteFicha(
        @Param('id', ParseIntPipe) id: number
    ){
        return this.fichaService.deleteFicha(id);
    }

}
