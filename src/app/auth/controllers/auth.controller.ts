import { Controller, Post, Body } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { UserService } from "@src/app/user/user.service";
import { AuthService } from "../services/auth.service";
import { LoginDto, RegisterDto } from "../dtos/auth.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,) {}

  // @ApiOperation({ summary: "Get current user using token" })
  // @Get("/me")
  // @IsAuth()
  // getProfile(@GetAuthUser() user: any): any {
  //   return this.authService.getMe(user.id);
  // }

  @ApiOperation({ summary: "Login and get current user" })
  @Post("/signin")
  signin(@Body() data: LoginDto) {
    return this.authService.signin(data);
  }

  @ApiOperation({ summary: "Signup and get current user" })
  @Post("/signup")
  async signUp(@Body() data: RegisterDto): Promise<any> {
    return this.authService.signUp(data);
  }

  // @ApiOperation({ summary: "Get new tokens using refresh token" })
  // @Post("/refresh-token")
  // async refreshToken(@Body() dto: RefreshTokenDTO) {
  //   return this.authService.refreshToken(dto);
  // }

  // @ApiOperation({ summary: "Admin revoke a user refresh token" })
  // @Post("/revoke-token")
  // async revokeToken(@Body() dto: RefreshTokenDTO) {
  //   return this.authService.revokeToken(dto);
  // }
}
