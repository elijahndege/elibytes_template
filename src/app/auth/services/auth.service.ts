import { VALIDATION_MESSAGE } from '@Core/common/constants/error-message';
import { compareHashString } from '@Core/utils/password-hash';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UserService } from '../../user/user.service';
import { LoginDto } from '../dtos/auth.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    return await this.userService.createOne(createUserDto);
  }
  async signin(data: LoginDto) {
    const user = await this.userService.findOneOrFail({
      where: {
        email: data.email,
      },
      relations: {
        localLogin: true,
        roles: {
          permissions: true,
        },
      },
    });
    console.log('[user]', user);

    const isSamePassword = await compareHashString(
      data.password,
      user.localLogin.password,
    );
    if (!isSamePassword) {
      throw new BadRequestException(VALIDATION_MESSAGE.PASSWORD_NOT_MATCH);
    }
    const { accessToken, refreshToken } = this.tokenService.generateAuthToken(
      { id: user.id },
      true,
    );
    // await this.repo.saveRefreshToken(user, refreshToken);
    return { accessToken, refreshToken };
  }
}
