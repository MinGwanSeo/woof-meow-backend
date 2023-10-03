import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { ValidationPipe, Logger, LoggerService, RequestMethod } from "@nestjs/common";
import compression from '@fastify/compress';
import cookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "src/app.module";
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from "nestjs-pino";
import { loggerConfig } from "./common/logger.config";

export class PinoLoggerService implements LoggerService {
  private readonly logger = new PinoLogger(loggerConfig);

  constructor(context?: string) {
    this.logger.setContext(context || 'PinoLoggerService');
  }

  private setContext(context: string) {
    this.logger.setContext(context);
  }

  public log(message: string) {
    this.logger.info(message);
  }

  public error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  public warn(message: string) {
    this.logger.warn(message);
  }
}

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const pinoLogger = new PinoLoggerService('Bootstrap');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
    { logger: pinoLogger }
  );


  const configService = app.get(ConfigService);

  const DEFAULT_PORT = configService.get<number>('DEFAULT_PORT', 3000);
  const SWAGGER_ENDPOINT = configService.get<string>('SWAGGER_ENDPOINT', 'api-docs');
  const COOKIE_SECRET_SUFFIX = configService.get<string>('COOKIE_SECRET_SUFFIX', 'secret');
  const env = configService.get<string>('NODE_ENV', 'local');
  const isEnvDevelop = configService.get<string>('NODE_ENV', 'local') === 'local';

  if (isEnvDevelop) {
    setupSwagger(app, SWAGGER_ENDPOINT, env, pinoLogger);
  }

  setupSecurity(app, isEnvDevelop);
  setupCompression(app);
  setupCookies(app, COOKIE_SECRET_SUFFIX, env);
  setupValidation(app);

  await app.listen(DEFAULT_PORT).then(() => {
    pinoLogger.log(`server listening on port http://localhost:${DEFAULT_PORT}`);
  }).catch((error) => {
    pinoLogger.error('Error during bootstrap:', error);
    process.exit(1);
  });
}

function setupSecurity(app: NestFastifyApplication, isEnvDevelop: boolean) {
  const helmetOptions = isEnvDevelop ? {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  } : undefined;

  app.register(helmet, helmetOptions);
}

function setupCompression(app: NestFastifyApplication) {
  app.register(compression, { encodings: ['gzip', 'deflate'] });
}

function setupCookies(app: NestFastifyApplication, COOKIE_SECRET_SUFFIX: string, env: string) {
  app.register(cookie, {
    secret: `${env}-${COOKIE_SECRET_SUFFIX}`,
  });
}

function setupValidation(app: NestFastifyApplication) {
  app.useGlobalPipes(new ValidationPipe());
}

function setupSwagger(app: NestFastifyApplication, SWAGGER_ENDPOINT: string, env: string, logger: LoggerService) {
  const version = env === 'local'
    ? 'local'
    : `${new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
    })}`;

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Woof-Meow-Backend API')
      .setDescription('API description')
      .setVersion(version)
      .addTag('Woof-Meow-Backend')
      .build()
  );

  SwaggerModule.setup(SWAGGER_ENDPOINT, app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      deepLinking: true,
      defaultModelRendering: 'model',
      displayRequestDuration: true,
      defaultModelsExpandDepth: 10,
      defaultModelExpandDepth: 10,
    },
  });

  logger.log(`Swagger is running on http://localhost:${env}/${SWAGGER_ENDPOINT}`);
}

bootstrap();
