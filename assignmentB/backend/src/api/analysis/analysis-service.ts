import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';

@Injectable()
export class AnalysisService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  // Get all articles with status 'moderated'
  async getModeratedArticles(): Promise<Article[]> {
    return this.articleModel.find({ status: 'moderated' }).exec();
  }

  // Analyze the article by updating its claim, evidence, and status to 'analyzed'
  async analyzeArticle(id: string, analysisData: { analystClaim: string; analystEvidence: string }): Promise<Article> {
    return this.articleModel.findByIdAndUpdate(
      id,
      {
        analystClaim: analysisData.analystClaim,
        analystEvidence: analysisData.analystEvidence,
        status: 'analyzed',
      },
      { new: true }
    ).exec();
  }
  
}
