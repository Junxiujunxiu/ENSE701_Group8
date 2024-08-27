import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authors: string[];

  @Prop({ required: true })
  journal: string;

  @Prop()
  year: number;

  @Prop()
  volume: string;

  @Prop()
  number: string;

  @Prop()
  pages: string;

  @Prop()
  doi: string;

  @Prop({ required: true })
  seMethod: string;

  @Prop({ required: true })
  claim: string;

  @Prop({ required: true })
  evidence: string;

  @Prop()
  typeOfResearch: string;

  @Prop()
  typeOfParticipant: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
