import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { AnalysisService } from './analysis-service';

@Controller('api/analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  // Route to fetch all articles ready for analysis
  @Get()
  async getModeratedArticles() {
    return this.analysisService.getModeratedArticles();
  }

  // Route to analyze an article and update its status
  @Patch(':id')
  async analyzeArticle(@Param('id') id: string, @Body() analysisData: any) {
    return this.analysisService.analyzeArticle(id, analysisData);
  }
}
