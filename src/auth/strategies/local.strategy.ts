import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        })
    }

    async validate( email: string, password: string) {
        if( email == '' || password == '' ) throw new UnauthorizedException('El email o la contraseña no fue completado');
        const user = await this.authService.validateUser(email, password);
        if(!user) throw new UnauthorizedException('El email y la contraseña no son válidos.');
        return user;
    }
}