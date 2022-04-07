import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsArray,
    IsEnum,
  } from 'class-validator';
import { AppRoles } from 'src/app.roles';
import { EnumToString } from 'src/common/helpers/enumToString';

  export class CreateUserDto {
    
    @IsString()
    @MaxLength(255)
    name: string;
  
    @IsString()
    @MaxLength(255)
    lastName: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(8)
    @MaxLength(128)
    password: string;
  
    @IsArray()
    @IsEnum(AppRoles, {
      each: true,
      message: `Debe ser un rol válido, ${EnumToString(AppRoles)}`,
    })
    roles: string[];
    
  }
