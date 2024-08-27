import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  const uri = configService.get<string>('MONGODB_URI');

  if (!uri) {
    throw new Error('MongoDB URI is not defined in the environment variables');
  }

  Logger.log(`Connecting to MongoDB at ${uri}`, 'MongoConfig');
  
  return {
    uri,
  };
};
