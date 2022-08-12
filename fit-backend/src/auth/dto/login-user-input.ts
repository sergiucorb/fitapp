/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';
import { Post } from 'src/posts/post.schema';

@InputType()
export class LoginUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
