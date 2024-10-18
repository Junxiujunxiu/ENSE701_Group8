import { Controller, Get, Patch, Param, Body, Post } from '@nestjs/common';
import { ModerationService } from './moderation-service';
import { Article } from '../articles/article.schema';

@Controller('api/moderation')
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  // Route to fetch all articles pending moderation
  @Get()
  async getPendingArticles() {
    return this.moderationService.getPendingArticles();
  }

  // Route to fetch the count of articles pending moderation
  @Get('pending-count')
  async getPendingArticleCount() {
    return this.moderationService.getPendingArticleCount(); // Call service method for count
  }

  // Route to update the moderation status of an article by ID
  @Patch(':id')
  async moderateArticle(
    @Param('id') id: string,
    @Body('status') status: 'moderated' | 'rejected',
  ) {
    return this.moderationService.moderateArticle(id, status);
  }

  /* use Body() to received new article info - title and DOI (passed by front end)
    then, call findSimilarArticles(newArticle) from service.ts to return a list of articles that similar to this article */
  @Post('compare')
  async compareWithDatabase(@Body() newArticle: Partial<Article>) {
    // console.log('Received article for comparison', newArticle);
    return this.moderationService.findSimilarArticles(newArticle);
  }
}
