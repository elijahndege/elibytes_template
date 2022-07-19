import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { ConfigService } from './core/shared/config/config.service';
import { SharedModule } from './core/shared/shared.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.select(SharedModule).get(ConfigService);

  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        'base-uri': ['self'],
        //          "form-action": ["self"],
        'script-src': ['self', 'http:https'],
        'object-src': ['none'],
        'require-trusted-types-for': ['script'],
        upgradeInsecureRequests: [],
        'report-uri': ['#'],
      },
    }),
  );
  app.use(helmet.crossOriginEmbedderPolicy());
  app.use(helmet.crossOriginOpenerPolicy());
  app.use(helmet.crossOriginResourcePolicy());
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.expectCt());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(
    helmet.hsts({
      maxAge: 15552000,
      includeSubDomains: true,
    }),
  );
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.originAgentCluster());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
  app.use(helmet.xssFilter());

  app.enableCors({
    credentials: true,
    origin: config.allowedOrigins,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      transform: true,
    }),
  );
  app.useGlobalFilters();

  if (config.appEnv === 'development' || config.appEnv === 'local') {
    const options = new DocumentBuilder()
      .setTitle(config.appName)
      .setDescription('This is NestJs Starter Template')
      .setVersion('0.0.1')
      .addBearerAuth()
      .setContact('Elijah Ndege', 'https://elibytes.me', 'hello@elibytes.ne')
      .build();

    const document = SwaggerModule.createDocument(app, options, {
      deepScanRoutes: true,
    });
    SwaggerModule.setup('documentation', app, document);
  }

  function listenCallback() {
    Logger.log(
      `*** Application running in [${config.appEnv}] environment on port [${config.port}] ***`,
    );
  }
  try {
    await app.listen(config.port, listenCallback);
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (error) {
    Logger.error(error, `Application didn't run`);
  }
}
bootstrap();
