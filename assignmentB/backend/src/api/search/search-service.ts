import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../articles/article.schema';

@Injectable()
export class SearchService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  // Perform a search with filters like title
  async search(query: any): Promise<Article[]> {
    return this.articleModel
      .find({
        title: { $regex: query.title, $options: 'i' }, // Case-insensitive search for title
      })
      .exec();
  }
}

