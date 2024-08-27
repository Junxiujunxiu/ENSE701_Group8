import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnalystDto } from './dto/create-analyst.dto';
import { Analyst, AnalystDocument } from './schemas/analyst.schema';
import { Article, ArticleDocument } from '../articles/schemas/article.schema'; // Import Article schema


@Injectable()
export class AnalystsService {
  constructor(
    @InjectModel(Analyst.name) private analystModel: Model<AnalystDocument>,
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>
  ) {}

  async create(createAnalystDto: CreateAnalystDto): Promise<Analyst> {
    const createdAnalyst = new this.analystModel(createAnalystDto);
    return createdAnalyst.save();
  }

  async findAll(): Promise<Analyst[]> {
    return this.analystModel.find().exec();
  }

  async findOne(id: string): Promise<Analyst> {
    const analyst = await this.analystModel.findById(id).exec();
    if (!analyst) {
      throw new NotFoundException(`Analyst with ID ${id} not found`);
    }
    return analyst;
  }

  // New method for fetching articles for analysis
  async findArticlesForAnalysis(): Promise<Article[]> {
    // Logic to find articles that are pending analysis
    return this.articleModel.find({ status: 'pending analysis' }).exec();
  }
}
