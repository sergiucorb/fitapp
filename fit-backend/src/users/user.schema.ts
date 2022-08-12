/* eslint-disable prettier/prettier */
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId, Types } from 'mongoose';
import { Post } from '../posts/post.schema';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  @Field(() => ID)
  _id: string;

  @Prop()
  @Field()
  role: string;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field()
  password: string;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: false },
    ],
  })
  @Field(() => [ID])
  posts: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
