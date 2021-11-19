import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateFichaDto } from "./create-ficha.dto";

export class UpdateFichaDto extends PartialType(CreateFichaDto
    //El omit no solo omite la validacion, ignora completamente el campo y no lo modifica
    /*OmitType( CreateFichaDto, 
        [
            'diagnostico', 
            'medico_derivante', 
            'estudios_complementarios', 
            'antecedentes',
            'mecanismo_de_lesion',
            'antiguedad',
            'localizacion',
            'caracteristica',
            'irradiacion',
            'atenuacion_agravacion',
            'observaciones'
        ] as const )*/
) {

}