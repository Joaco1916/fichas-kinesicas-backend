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

  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.USER
  })
  @Post()
  async createOne(
    @Body() createUserDto: CreateUserDto
  ) {
    const data = await this.usersService.createOne(createUserDto);
    return { 
      message: 'User created',
      data
    }
  }

  @Post('register')
  async publicRegistration(
    @Body() userRegistrationDto: UserRegistrationDto
  ) {
    const data = await this.usersService.createOne({
      ...userRegistrationDto, roles: [AppRoles.AUTHOR]
    });

    return {
      message: 'User registered',
      data
    }
  }

  @Get()
  async getMany() {
    const data = await this.usersService.getMany();
    return {
      data
    }
  }

  @Get(':id')
  async getOne(
    @Param('id') id: number
  ) {
    return await this.usersService.getOne(id);
  }

  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResource.USER
  })
  @Put(':id')
  async updateOne(
    @Param('id') id: number, 
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
      data = await this.usersService.updateOne(id, updateUserDto);
    } else {
      //Logica de user normal
      const { roles, ...rest } = updateUserDto;
      data = await this.usersService.updateOne(id, rest, user);
    }

    return {
      message: 'User edited successfully',
      data
    }
  }

  @Auth({
    possession: 'own',
    action: 'delete',
    resource: AppResource.USER
  })
  @Delete(':id')
  async deleteOne(
    @Param('id') id: number,
    @User() user: UserEntity
  ) {
    let data;

    if(this.rolesBuilder
        .can(user.roles)
        .updateAny(AppResource.USER)
        .granted
    ) {
      //Logica de admin
      data = await this.usersService.deleteOne(id);
    } else {
      //Logica de user normal
      data = await this.usersService.deleteOne(id, user);
    }
    
    return {
      message: 'User deleted successfully',
      data
    }
  }
}
