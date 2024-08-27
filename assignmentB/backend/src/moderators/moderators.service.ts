import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateModeratorDto } from './dto/create-moderator.dto';
import { Moderator, ModeratorDocument } from './schemas/moderator.schema';

@Injectable()
export class ModeratorsService {
  constructor(
    @InjectModel(Moderator.name) private moderatorModel: Model<ModeratorDocument>,
  ) {}

  async create(createModeratorDto: CreateModeratorDto): Promise<Moderator> {
    const createdModerator = new this.moderatorModel(createModeratorDto);
    return createdModerator.save();
  }

  async findAll(): Promise<Moderator[]> {
    return this.moderatorModel.find().exec();
  }

  async findOne(id: string): Promise<Moderator> {
    const moderator = await this.moderatorModel.findById(id).exec();
    if (!moderator) {
      throw new NotFoundException(`Moderator with ID ${id} not found`);
    }
    return moderator;
  }
}
