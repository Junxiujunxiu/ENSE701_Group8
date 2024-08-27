import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AnalystsService } from './analysts.service';
import { CreateAnalystDto } from './dto/create-analyst.dto';
import { Analyst } from './schemas/analyst.schema';
import { Article } from '../articles/schemas/article.schema'; // Import Article schema

@Controller('analysts')
export class AnalystsController {
  constructor(private readonly analystsService: AnalystsService) {}

  @Post()
  async create(@Body() createAnalystDto: CreateAnalystDto): Promise<Analyst> {
    return this.analystsService.create(createAnalystDto);
  }

  @Get()
  async findAll(): Promise<Analyst[]> {
    return this.analystsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Analyst> {
    return this.analystsService.findOne(id);
  }
   // New route for fetching articles for analysis
   @Get('analysis')
   async getArticlesForAnalysis(): Promise<Article[]> {
     return this.analystsService.findArticlesForAnalysis();
   }
 }
