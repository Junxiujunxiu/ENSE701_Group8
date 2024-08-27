import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalystsController } from './analysts.controller';
import { AnalystsService } from './analysts.service';
import { Analyst, AnalystSchema } from './schemas/analyst.schema';
import { Article, ArticleSchema } from '../articles/schemas/article.schema'; // Import Article schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Analyst.name, schema: AnalystSchema }]),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]), // Register Article schema
  ],
  controllers: [AnalystsController],
  providers: [AnalystsService],
  exports: [AnalystsService],
})
export class AnalystsModule {}
