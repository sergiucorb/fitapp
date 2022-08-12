/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  type: string;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => String)
  user: string;
}
