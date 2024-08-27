import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service'; 
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './schemas/article.schema';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  async findAll(@Query('seMethod') seMethod?: string): Promise<Article[]> {
    return this.articlesService.findAll(seMethod);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    return this.articlesService.findOne(id);
  }
}
