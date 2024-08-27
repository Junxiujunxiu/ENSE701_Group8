import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnalystDto } from './dto/create-analyst.dto';
import { Analyst, AnalystDocument } from './schemas/analyst.schema';

@Injectable()
export class AnalystsService {
  constructor(
    @InjectModel(Analyst.name) private analystModel: Model<AnalystDocument>,
  ) {}

  async create(createAnalystDto: CreateAnalystDto): Promise<Analyst> {
    const createdAnalyst = new this.analystModel(createAnalystDto);
    return createdAnalyst.save();
  }

  async findAll(): Promise<Analyst[]> {
    return this.analystModel.find().exec();
  }

  async findOne(id: string): Promise<Analyst> {
    const analyst = await this.analystModel.findById(id).exec();
    if (!analyst) {
      throw new NotFoundException(`Analyst with ID ${id} not found`);
    }
    return analyst;
  }
}
