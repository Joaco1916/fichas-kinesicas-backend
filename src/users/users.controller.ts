import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Put(':id')
  async updateOne(
    @Param('id') id: number, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    const data = await this.usersService.updateOne(id, updateUserDto);
    return {
      message: 'User edited successfully',
      data
    }
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: number
  ) {
    const data = await this.usersService.deleteOne(id);
    return {
      message: 'User deleted successfully',
      data
    }
  }
}
