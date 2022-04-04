import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateFichaDto {
    
    //Datos personales
    @IsString()
    ocupacion: string;

    @IsNumber()
    edad: number;

    @IsBoolean()
    marcapasos: boolean;

    @IsBoolean()
    audifonos: boolean;

    @IsBoolean()
    embarazo: boolean;

    @IsBoolean()
    protesis: boolean;

    //Motivo de consulta
    @IsString()
    diagnostico: string;
    
    @IsString()
    medico_derivante: string;
    
    @IsString()
    estudios_complementarios: string;
    
    @IsString()
    antecedentes: string;

    //Dolor
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