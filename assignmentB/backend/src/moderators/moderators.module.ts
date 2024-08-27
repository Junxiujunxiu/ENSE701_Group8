import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModeratorsController } from './moderators.controller';
import { ModeratorsService } from './moderators.service';
import { Moderator, ModeratorSchema } from './schemas/moderator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Moderator.name, schema: ModeratorSchema }]),
  ],
  controllers: [ModeratorsController],
  providers: [ModeratorsService],
  exports: [ModeratorsService],
})
export class ModeratorsModule {}
