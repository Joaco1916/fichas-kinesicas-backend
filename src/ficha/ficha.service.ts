import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFichaDto, UpdateFichaDto } from './dtos';
import { Ficha } from './entities/ficha.entity';

@Injectable()
export class FichaService {

    constructor(
        @InjectRepository(Ficha)
        private readonly fichaRepository: Repository<Ficha>
    ){}
    
    async getFichas(): Promise<Ficha[]> {
        return await this.fichaRepository.find()
    }

    async getFicha(id: number){
        const ficha = await this.fichaRepository.findOne(id);
        if(!ficha) throw new NotFoundException('Ficha does not exist');
        return ficha;
    }

    async createFicha(dto: CreateFichaDto){
        const ficha = this.fichaRepository.create(dto);
        return await this.fichaRepository.save(ficha);
    }

    async editFicha(id: number, dto: UpdateFichaDto){
        const ficha = await this.fichaRepository.findOne(id);
        if(!ficha) throw new NotFoundException('Ficha does not exist');
        const editedFicha = Object.assign(ficha, dto);
        return await this.fichaRepository.save(editedFicha);
    }

    async deleteFicha(
        id: number
    ){
        return await this.fichaRepository.delete(id);
    }
}
