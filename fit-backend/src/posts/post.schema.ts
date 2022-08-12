/* eslint-disable prettier/prettier */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../users/user.schema';
import { ObjectId } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
@ObjectType()
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Field(() => ID)
  _id: string;

  @Prop()
  @Field()
  title: string;

  @Prop()
  @Field()
  description: string;

  @Prop()
  @Field()
  type: string;

  @Prop()
  @Field()
  active: boolean;

  // @Prop({
  //   type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // })
  @Prop()
  @Field()
  user: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
