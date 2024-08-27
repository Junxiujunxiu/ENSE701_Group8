import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalystsController } from './analysts.controller';
import { AnalystsService } from './analysts.service';
import { Analyst, AnalystSchema } from './schemas/analyst.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Analyst.name, schema: AnalystSchema }]),
  ],
  controllers: [AnalystsController],
  providers: [AnalystsService],
  exports: [AnalystsService],
})
export class AnalystsModule {}
