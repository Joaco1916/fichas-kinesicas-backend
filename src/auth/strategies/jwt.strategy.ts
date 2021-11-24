import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import * as constants from '../../config/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UsersService,
        private config: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>(constants.JWT_SECRET),
        });
    }

    async validate(payload: any) {
        const { sub: id } = payload;
        return await this.userService.getOne(id);
    }
}