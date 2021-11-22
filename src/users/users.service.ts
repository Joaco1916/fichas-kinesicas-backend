import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createOne(dto: CreateUserDto) {
    const userExist = await this.userRepository.findOne({ email: dto.email });
    if( userExist ) throw new BadRequestException('User already register with this email');

    const newUser = this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);

    delete user.password;
    return user;
  }

  async getMany() {
    return await this.userRepository.find();
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if(!user) throw new NotFoundException('User does not exists');
    return user;
  }

  async updateOne(id: number, dto: UpdateUserDto) {
    /*
    const user = await this.userRepository.findOne(id);
    if(!user) throw new NotFoundException('User does not exists');
    */

    const user = await this.getOne(id);
    const editedUser = Object.assign(user, dto);

    const finalUser = await this.userRepository.save(editedUser);

    delete finalUser.password;
    return finalUser;
  }

  async deleteOne(id: number) {
    const user = await this.getOne(id);
    return await this.userRepository.remove(user);
  }
}
