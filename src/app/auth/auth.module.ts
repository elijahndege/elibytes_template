import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '@src/core/shared/shared.module';
import { JwtConfigService } from '@src/core/shared/jwt/jwt-config.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    UserModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [SharedModule],
      useExisting: JwtConfigService,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TokenService],
  exports:[JwtStrategy,TokenService]
})
export class AuthModule {}
