/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';
import { Post } from 'src/posts/post.schema';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  role: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => [String])
  posts: string[];
}
