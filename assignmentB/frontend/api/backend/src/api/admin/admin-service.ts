import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  // Fetch all articles
  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  // Update an article
  async updateArticle(id: string, updateData: any): Promise<Article> {
    const article = await this.articleModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  // Delete an article
  async deleteArticle(id: string): Promise<Article | null> {
    const article = await this.articleModel.findByIdAndDelete(id).exec();
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }
}
