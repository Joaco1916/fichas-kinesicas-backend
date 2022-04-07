import { Body, Controller, Get, Post, 
    UseGuards 
} from '@nestjs/common';
import { 
    ApiTags 
} from '@nestjs/swagger';
import { User, Auth } from 'src/common/decorators';
import { User as UserEntity } from 'src/users/entities';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { 
    LocalAuthGuard,
} from './guards';

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
            message: 'Inicio de sesión exitoso.',
            data
        }
    }

    @Auth()
    @Get('profile')
    profile(
        @User() user: UserEntity
    ){
        return {
            message: 'Petición correcta',
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
            message: 'Token revalidado exitosamente',
            data
        }
    }
}
