import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //cambio de prefijo de la ruta de manera global
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      //solo pasa los campos que estan en el dto
      whitelist: true,
      //evita que se envien campos que no estan en el dto
      forbidNonWhitelisted: true,
      //transforma los tipos de datos a los que se especifico en el dto
      transform: true,
      //transforma los tipos de datos a los que se especifica
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
