import { Controller, Get, Patch, Delete, Param, Body, Logger } from '@nestjs/common';
import { AdminService } from './admin-service';
import { Article } from '../articles/article.schema';

@Controller('api/admin')
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(private readonly adminService: AdminService) {}

  @Get()
  async getAllArticles(): Promise<Article[]> {
    this.logger.log('Fetching all articles');
    return this.adminService.findAll();
  }

  @Patch(':id')
  async updateArticle(@Param('id') id: string, @Body() updateData: any) {
    this.logger.log(`Updating article with ID: ${id}`);
    return this.adminService.updateArticle(id, updateData);
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    this.logger.log(`Deleting article with ID: ${id}`);
    return this.adminService.deleteArticle(id);
  }
}
