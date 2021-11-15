import { Injectable } from "@nestjs/common";
import { JwtOptionsFactory, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigService } from "../config/config.service";

Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    constructor(private readonly config: ConfigService){
    }
    
    createJwtOptions(): JwtModuleOptions {
      return <JwtModuleOptions>{
        secret: 'secret',
        signOptions: { expiresIn: 180 }
      };
    }
  }