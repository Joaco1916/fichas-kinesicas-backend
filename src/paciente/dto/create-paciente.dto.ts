import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreatePacienteDto {
    
    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsString()
    email: string;

    @IsNumber()
    telefono: number;

    @IsString()
    calle: string;

    @IsNumber()
    nroCalle: number;
}