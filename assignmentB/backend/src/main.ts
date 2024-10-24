import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

async function bootstrap() {
  const dbUri = process.env.DB_URI;
  const port = process.env.PORT || 3001;  // Default to 3001

  Logger.log(`DB_URI: ${dbUri}`, 'Bootstrap');
  Logger.log(`PORT: ${port}`, 'Bootstrap');  // Log the port

  // Try connecting to MongoDB and log success or failure
  try {
    Logger.log('Attempting to connect to MongoDB...', 'Bootstrap');
    await mongoose.connect(dbUri, { serverSelectionTimeoutMS: 5000 });
    Logger.log('Database connected successfully');
  } catch (err) {
    Logger.error('Database connection error:', err);
  }

  // Log the start of the NestJS application creation
  try {
    Logger.log('Starting NestJS application...', 'Bootstrap');
    const app = await NestFactory.create(AppModule);

    // Enable CORS for cross-origin requests, restrict to Vercel domain in production
    app.enableCors({
      origin: ['https://ense-701-group8.vercel.app'],  // Allow only Vercel domain
      credentials: true,
    });

    await app.listen(port, () => Logger.log(`Server running on port ${port}`));
  } catch (err) {
    Logger.error('Error starting NestJS application:', err);
  }
}

bootstrap();  // Call the bootstrap function
