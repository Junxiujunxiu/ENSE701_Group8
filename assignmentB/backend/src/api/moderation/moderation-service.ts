import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';

@Injectable()
export class ModerationService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async getPendingArticles(): Promise<Article[]> {
    return this.articleModel.find({ status: 'submitted' }).exec();  // Fetch articles with status 'submitted'
  }
  

  // Update the article's status (moderated or rejected)
  async moderateArticle(id: string, status: 'moderated' | 'rejected'): Promise<Article> {
    return this.articleModel.findByIdAndUpdate(id, { status }, { new: true }).exec();  // Update article status
  }  
}
