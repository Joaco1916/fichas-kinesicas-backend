import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User, Auth } from 'src/common/decorators';
import { User as UserEntity } from 'src/users/entities';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
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
        @Body() loginDto: LoginDto,
        @User() user: UserEntity
    ){
        const data = this.authService.login(user);
        return {
            message: 'Sucessfully login',
            data
        }
    }

    @Auth()
    @Get('profile')
    profile(
        @User() user: UserEntity
    ){
        return {
            message: 'Peticion correcta',
            user
        }
    }

    @Auth()
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
