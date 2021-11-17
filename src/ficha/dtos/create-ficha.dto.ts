import { IsString } from "class-validator";

export class CreateFichaDto {
    
    @IsString()
    diagnostico: string;
    
    @IsString()
    medico_derivante: string;
    
    @IsString()
    estudios_complementarios: string;
    
    @IsString()
    antecedentes: string;

    @IsString()
    mecanismo_de_lesion: string;
    
    @IsString()
    antiguedad: string;
    
    @IsString()
    localizacion: string;
    
    @IsString()
    caracteristica: string;
    
    @IsString()
    irradiacion: string;
    
    @IsString()
    atenuacion_agravacion: string;

    @IsString()
    observaciones: string;
}