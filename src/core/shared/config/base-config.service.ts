import { EnvironmentConfig } from '@Core/common/interfaces';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Joi from 'joiful';
import { EnvironmentVariables } from './environment-variables';
@Injectable()
export class BaseConfigService {
  getEnvironmentVariables() {
    try {
      return dotenv.config().parsed;
    } catch (error) {
      throw new Error(`[getEnvs] Unable to parse .env: ${error}`);
    }
  }

  validateInput(environmentConfig: EnvironmentConfig): EnvironmentConfig {
    const { error, value: validatedEnvs } = Joi.validateAsClass(
      environmentConfig,
      EnvironmentVariables,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvs;
  }
}
