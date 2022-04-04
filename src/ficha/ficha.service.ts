import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { User } from 'src/users/entities';
import { Repository } from 'typeorm';
import { CreateFichaDto, UpdateFichaDto } from './dtos';
import { Ficha } from './entities/ficha.entity';

@Injectable()
export class FichaService {

    constructor(
        @InjectRepository(Ficha)
        private readonly fichaRepository: Repository<Ficha>
    ){}
    
    async getFichas( author?: User ): Promise<Ficha[]> {
        return await this.fichaRepository.find()
    }

    async getFicha(id: number, author?: Paciente){
        const ficha = await this.fichaRepository.findOne(id)
            .then(fichaFinded => !author ? fichaFinded : !!fichaFinded && author.id === fichaFinded.author.id ? fichaFinded : null);
        if(!ficha) throw new NotFoundException('Esta ficha no existe.');
        return ficha;
    }

    async createFicha(dto: CreateFichaDto, author?: Paciente){
        const ficha = this.fichaRepository.create({...dto, author});
        return await this.fichaRepository.save(ficha);
    }

    async editFicha(id: number, dto: UpdateFichaDto, author?: Paciente){
        //const ficha = await this.fichaRepository.findOne(id);
        const ficha = await this.getFicha(id, author);
        if(!ficha) throw new NotFoundException('Esta ficha no existe.');
        const editedFicha = Object.assign(ficha, dto);
        return await this.fichaRepository.save(editedFicha);
    }

    async deleteFicha(id: number, author?: Paciente){
        const ficha = await this.getFicha(id, author);
        return await this.fichaRepository.remove(ficha);
    }
}
