import { Injectable } from '@nestjs/common';//This decorator marks the calss as a provider that can be injected into other classes.
import { InjectModel } from '@nestjs/mongoose'; //decorator from mongoose that inject the mongoose model into the service
import { Model } from 'mongoose'; //model interface from mongoose that provides methods for databse
import { Article, ArticleDocument } from './article.schema'; // from article.schema, article is the class name and the document is the alias type
import { CreateArticleDto } from './create-article.dto'; // data transfer object that defines the shae of data to create article

//makes the class usable in other components
@Injectable()
export class ArticleService {
  //constructor for the class that injects the mongoose model for the article schema
  //@InjectModel(Article.name) : allowing the servic to interact with the mongoDB collection, specified by aricle name.
  //private articleModel: Model<ArticleDocument>: variable articleModel with class type Model (Mongoose class representing the collection)
  //<ArticleDocument>: type of document that this model handles
  //overall, this property stores mongoose model instance that handle document shaped like "ArticleDocument."
  //I can use this variable within the class to interact with the articles collection.
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  //asynchronous method that creates a new article in the databse
  //taskes a 'CreateArticleDto' object as input and returns a promise.
  //creates instance of article model using the data from 'createArticleDto'
  //save the article to the databased and returns the saved document.
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDto);
    return createdArticle.save();
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    return this.articleModel.findById(id).exec();
  }

  async update(id: string, createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articleModel.findByIdAndUpdate(id, createArticleDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Article> {
    return this.articleModel.findByIdAndDelete(id).exec();
  }
}
