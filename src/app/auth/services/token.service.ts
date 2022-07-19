import { HTTP_MESSAGE } from '@Core/common/constants/error-message';
import { ConfigService } from '@Core/shared/config/config.service';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService, private config: ConfigService) {}

  /**
   * @Usage Generate JWT with the system secret and expires
   */
  generateAuthToken(payload: any, requireRefreshToken = false) {
    let accessToken: string = null;
    let refreshToken: string = null;

    accessToken = this.jwtService.sign(payload, {
      secret: this.config.jwtSecret,
      expiresIn: `${this.config.jwtTTL}s`,
    });

    if (requireRefreshToken) {
      refreshToken = this.jwtService.sign(payload, {
        secret: this.config.jwtSecret,
        expiresIn: `${this.config.jwtRefreshTTL}`,
      });
    }
    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * @Usage Verify JWT with the secret
   */
  async verifyAuthToken(token: string, secret: string): Promise<void> {
    try {
      await this.jwtService.verifyAsync(token, {
        secret,
      });
    } catch (error) {
      if (error.message == 'jwt expired') {
        throw new UnauthorizedException('Authentication info expired');
      }
      if (error.message == 'invalid signature') {
        throw new UnauthorizedException('Authentication info incorrect');
      }
      console.info(error.stack);
      throw new InternalServerErrorException(HTTP_MESSAGE.UNKNOWN_SERVER_ERROR);
    }
  }
}
