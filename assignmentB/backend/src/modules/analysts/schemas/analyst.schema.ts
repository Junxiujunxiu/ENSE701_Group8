import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnalystDocument = Analyst & Document;

@Schema()
export class Analyst {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  expertiseArea: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const AnalystSchema = SchemaFactory.createForClass(Analyst);
