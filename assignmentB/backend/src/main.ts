import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Get ConfigService to access environment variables
  const configService = app.get(ConfigService);
  
  // Retrieve MongoDB URI and the port number
  const mongodbUri = configService.get<string>('MONGODB_URI');
  const port = configService.get<number>('PORT') || 3000;

  // Log the MongoDB connection information
  Logger.log(`Connected to MongoDB at ${mongodbUri}`, 'Bootstrap');

  // Start the NestJS application
  await app.listen(port);

  // Log the application startup information
  Logger.log(`Application is running on: http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
