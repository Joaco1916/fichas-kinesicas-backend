import { Injectable } from '@nestjs/common';
import { CreateFichaDto, UpdateFichaDto } from './dtos';

@Injectable()
export class FichaService {
    
    getFichas() {
        return {
            ok: 'All fichas'
        };
    }

    getFicha(
        id: number
    ){
        return {
            ok: 'One ficha'
        };
    }

    createFicha(dto: CreateFichaDto){
        return {
            ok: 'Create ficha'
        };
    }

    editFicha(
        id: number,
        dto: UpdateFichaDto
    ){
        return {
            ok: 'Edit ficha'
        };
    }

    deleteFicha(
        id: number
    ){
        return {
            ok: 'Delete ficha'
        };
    }
}
