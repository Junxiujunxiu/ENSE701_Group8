import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';

@Injectable()
export class AnalysisService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async getModeratedArticles(): Promise<Article[]> {
    return this.articleModel.find({ status: 'moderated' }).exec();  // Fetch articles with status 'moderated'
  }
  

  // Analyze the article and update its status to 'analyzed'
  async analyzeArticle(id: string, analysisData: any): Promise<Article> {
    return this.articleModel.findByIdAndUpdate(id, { ...analysisData, status: 'analyzed' }, { new: true }).exec();
  }
}
