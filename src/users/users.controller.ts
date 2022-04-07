import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserRegistrationDto} from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, User } from 'src/common/decorators';
import { InjectRolesBuilder, RolesBuilder} from 'nest-access-control';
import { AppResource, AppRoles } from 'src/app.roles';
import { User as UserEntity } from './entities';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder
  ) {}

  @Post('register')
  async publicRegistration(
    @Body() userRegistrationDto: UserRegistrationDto
  ) {
    const data = await this.usersService.createOne({
      ...userRegistrationDto, roles: [AppRoles.AUTHOR]
    });

    return {
      message: 'Usuario registrado exitosamente.',
      data
    }
  }

  @Auth({
    possession: 'own',
    action: 'read',
    resource: AppResource.USER
  })
  @Get(':key')
  async getMany(
    @Param('key') key: string
  ) {
    const data = await this.usersService.getMany(key);
    return {
      data
    }
  }

  @Auth({
    possession: 'own',
    action: 'read',
    resource: AppResource.USER
  })
  @Get()
  async getOne(
    @User() user: UserEntity
  ) {
    return await this.usersService.getOne(user.id);
  }

  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResource.USER
  })
  @Put()
  async updateOne(
    @Body() updateUserDto: UpdateUserDto,
    @User() user: UserEntity
  ) {
    let data;

    if(this.rolesBuilder
        .can(user.roles)
        .updateAny(AppResource.USER)
        .granted
    ) {
      //Logica de admin
      data = await this.usersService.updateOne(user.id, updateUserDto);
    } else {
      //Logica de user normal
      const { roles, ...rest } = updateUserDto;
      data = await this.usersService.updateOne(user.id, rest, user);
    }

    return {
      message: 'Usuario editado exitosamente',
      data
    }
  }

  @Auth({
    possession: 'own',
    action: 'delete',
    resource: AppResource.USER
  })
  @Delete()
  async deleteOne(
    @User() user: UserEntity
  ) {
    let data;

    if(this.rolesBuilder
        .can(user.roles)
        .updateAny(AppResource.USER)
        .granted
    ) {
      //Logica de admin
      data = await this.usersService.deleteOne(user.id);
    } else {
      //Logica de user normal
      data = await this.usersService.deleteOne(user.id, user);
    }
    
    return {
      message: 'Usuario eliminado exitosamente',
      data
    }
  }
}
