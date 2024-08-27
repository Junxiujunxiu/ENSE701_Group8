import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ModeratorDocument = Moderator & Document;

@Schema()
export class Moderator {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  role: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ModeratorSchema = SchemaFactory.createForClass(Moderator);
