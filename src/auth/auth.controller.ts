import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators';
import { User as UserEntity } from 'src/users/entities';
import { AuthService } from './auth.service';
import { LocalAuthGuard, JwtAuthGuard } from './guards';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(
        @User() user: UserEntity
    ){
        const data = this.authService.login(user);
        return {
            message: 'Sucessfully login',
            data
        }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('profile')
    profile(
        @User() user: UserEntity
    ){
        return {
            message: 'Peticion correcta',
            user
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('refresh')
    refreshToken(
        @User() user: UserEntity
    ){
        const data = this.authService.login(user);
        return {
            message: 'Sucessfully refresh',
            data
        }
    }
}
