import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from './core/shared/config/config.service';
import * as helmet from 'helmet';
import { SharedModule } from './core/shared/shared.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const config = app.select(SharedModule).get(ConfigService);

  app
    .use(helmet())
    .enableCors();

  app.useGlobalPipes();
  app.useGlobalFilters()

  if (config.appEnv === 'development' || config.appEnv === 'local') {
    const options = new DocumentBuilder()
      .setTitle(config.appName)
      .setDescription('This is NestJs Starter Template')
      .setVersion('0.0.1')
      .addBearerAuth()
      .setContact(
        'Elijah Ndege',
        'https://elibytes.me',
        'hello@elibytes.ne'
      )
      .build();

    const document = SwaggerModule.createDocument(app, options, { deepScanRoutes: true });
    SwaggerModule.setup('documentation', app, document);
  }

  await app.listen(config.port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
