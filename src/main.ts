import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {ConfigService} from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)
  const PORT = configService.get('SERVER_PORT')

  //api 엔드포인트 prefix를 무시할 경로(exclude)
app.setGlobalPrefix('api', {exclude: ['/health-check']})

  app.useGlobalPipes(new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true
}))

//Swagger
const config = new DocumentBuilder()
.setTitle('Show Never Ends! TS')
.setDescription('what show do you want to enjoy?')
.setVersion('1.0')
.addBearerAuth({type: 'http', scheme: 'bearer', bearerFormat: 'JWT'})
.build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
