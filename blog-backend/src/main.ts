import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  config();
  await AppDataSource.initialize(); 
  await AppDataSource.runMigrations(); ;
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'), 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on PORT: ${process.env.PORT}`);
}
bootstrap();
