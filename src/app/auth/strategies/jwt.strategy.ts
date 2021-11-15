import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@src/core/shared/config/config.service";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserRepository } from "../../user/repositories/user.repository";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private usersRepository: UserRepository,
        private config: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.jwtSecret,
        });
    }

    async validate(payload: any): Promise<any> {
        if (payload.id)
            return this.usersRepository.findOne(payload.id, {
                relations: ["roles"],
            });
        return null;
    }
}