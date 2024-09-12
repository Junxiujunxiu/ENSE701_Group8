import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ModerationService } from './moderation-service';

@Controller('api/moderation')
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  // Route to fetch all articles pending moderation
  @Get()
  async getPendingArticles() {
    return this.moderationService.getPendingArticles();
  }

  // Route to update the moderation status of an article by ID
  @Patch(':id')
  async moderateArticle(@Param('id') id: string, @Body('status') status: 'moderated' | 'rejected') {
    return this.moderationService.moderateArticle(id, status);
  }
}
