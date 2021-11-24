import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any>{
        const user = await this.userService.getByEmail({ email });

        if(user && await compare(password, user.password) ){
            const { password, ...rest } = user;
            return rest;
        }

        return null;
    }

    login(user: User) {
        const { id, ...rest} = user;
        const payload = { sub: id};

        return {
            user,
            accessToken: this.jwtService.sign(payload)
        }
    }
}
