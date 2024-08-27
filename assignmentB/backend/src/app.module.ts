import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'), // Replace with your actual MongoDB connection string
    ArticlesModule,
  ],
})
export class AppModule {}
