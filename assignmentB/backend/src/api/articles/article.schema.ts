import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//type alias, creating a new name for an existing type.
//so AticleDocument ==== HydratedDocument<Article>. Article refers to the article class
export type ArticleDocument = HydratedDocument<Article>;

//defines the structure of documents stored in database collection.
@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authors: string[];

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  pubyear: number;

  @Prop({ required: true })
  doi: string;

  @Prop({ required: true })
  claim: string;

  @Prop({ required: true })
  evidence: string;
}

//
export const ArticleSchema = SchemaFactory.createForClass(Article);
