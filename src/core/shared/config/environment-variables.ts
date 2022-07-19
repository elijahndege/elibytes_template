import * as Joi from 'joiful';

export class EnvironmentVariables {
  @Joi.string().valid(['development', 'production', 'local']).default('local')
  APP_ENV: string;

  @Joi.string().required()
  APP_URL: string;

  @Joi.string().required()
  APP_NAME: string;

  @Joi.string().required()
  CLIENT_URL: string;

  @Joi.number().default(3000)
  APP_PORT: number;

  @Joi.number().default(4000)
  TRANSPORT_PORT: number;

  @Joi.string().required()
  JWT_TTL: string;

  @Joi.string().required()
  JWT_SECRET: string;

  @Joi.number().required()
  JWT_REFRESH_TTL: number;

  @Joi.number().required()
  MAIL_TOKEN_TTL: number;

  @Joi.string().required()
  TYPEORM_HOST: string;

  @Joi.number().required()
  TYPEORM_PORT: number;

  @Joi.string().required()
  TYPEORM_USERNAME: string;

  @Joi.string().required()
  TYPEORM_PASSWORD: string;

  @Joi.string().required()
  TYPEORM_DATABASE: string;

  @Joi.boolean().required()
  TYPEORM_LOGGING: boolean;

  @Joi.boolean().required()
  TYPEORM_MIGRATIONSRUN: boolean;

  @Joi.string().required()
  REDIS_URL: string;

  @Joi.string().required()
  MAIL_HOST: string;

  @Joi.number().required()
  MAIL_PORT: number;

  @Joi.string().required()
  MAIL_USERNAME: string;

  @Joi.string().required()
  MAIL_PASSWORD: string;

  @Joi.string().required()
  MAIL_FROM_ADDRESS: string;

  @Joi.number().required()
  THROTTLE_TTL: number;

  @Joi.number().required()
  THROTTLE_LIMIT: number;

  @Joi.string().required()
  ALLOWED_ORIGINS: string;
}
