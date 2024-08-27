import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ModeratorsService } from './moderators.service';
import { CreateModeratorDto } from './dto/create-moderator.dto';
import { Moderator } from './schemas/moderator.schema';

@Controller('moderators')
export class ModeratorsController {
  constructor(private readonly moderatorsService: ModeratorsService) {}

  @Post()
  async create(@Body() createModeratorDto: CreateModeratorDto): Promise<Moderator> {
    return this.moderatorsService.create(createModeratorDto);
  }

  @Get()
  async findAll(): Promise<Moderator[]> {
    return this.moderatorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Moderator> {
    return this.moderatorsService.findOne(id);
  }
}
