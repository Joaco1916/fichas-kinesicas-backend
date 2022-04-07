import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';

export interface UserGetByEmail {
  id?: number;
  email?: string;
}

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createOne(dto: CreateUserDto) {
    const userExist = await this.userRepository.findOne({ email: dto.email });
    if( userExist ) throw new BadRequestException('Este email ya tiene una cuenta creada.');

    const newUser = this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);

    delete user.password;
    return user;
  }

  async getMany(key: string) {
    if( key != 'adminJR.') throw new BadRequestException('No estás autorizado a ver esta información.');
    return await this.userRepository.find();
  }

  async getOne(id: number, userEntity?: User) {
    const user = await this.userRepository.findOne(id)
      .then( userFinded => !userEntity ? userFinded : !!userFinded && userEntity.id === userFinded.id ? userFinded : null)
    if(!user) throw new NotFoundException('Este usuario no existe o no estás autorizado para verlo.');
    return user;
  }

  async getByEmail(data: UserGetByEmail) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne();
  }

  async updateOne(id: number, dto: UpdateUserDto, userEntity?: User) {
    const user = await this.getOne(id, userEntity);
    const editedUser = Object.assign(user, dto);

    const finalUser = await this.userRepository.save(editedUser);

    delete finalUser.password;
    return finalUser;
  }

  async deleteOne(id: number, userEntity?: User) {
    const user = await this.getOne(id, userEntity);
    return await this.userRepository.remove(user);
  }
}
