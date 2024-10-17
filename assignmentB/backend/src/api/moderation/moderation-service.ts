import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';

@Injectable()
export class ModerationService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async getPendingArticles(): Promise<Article[]> {
    return this.articleModel.find({ status: 'submitted' }).exec(); // Fetch articles with status 'submitted'
  }

  // Get the count of pending articles
  async getPendingArticleCount(): Promise<number> {
    return this.articleModel.countDocuments({ status: 'submitted' }).exec(); // Count documents with status 'submitted'
  }

  // Update the article's status (moderated or rejected)
  async moderateArticle(
    id: string,
    status: 'moderated' | 'rejected',
  ): Promise<Article> {
    return this.articleModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec(); // Update article status
  }

  // to find the similar articles in the database base on the title and DOI of the new submitted article
  async findSimilarArticles(newArticle: Partial<Article>): Promise<Article[]> {
    return this.articleModel
      .find({
        $or: [
          // options i means igonre case
          { title: { $regex: newArticle.title, $options: 'i' } },
          { doi: { $regex: newArticle.doi, $options: 'i' } },
        ],
        status: { $in: ['analyzed', 'rejected'] },
      })
      .exec();
  }
}
