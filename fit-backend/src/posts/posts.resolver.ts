import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Post } from './post.schema';
import { PostsService } from './posts.service';
import { CreatePostInput } from './create-post-input';
import { create } from 'domain';

@Resolver()
export class PostsResolver {
  constructor(private postsService: PostsService) {}
  @Query(() => [Post])
  async getPosts(): Promise<Post[]> {
    return this.postsService.getPosts();
  }
  @Query(() => [Post])
  async getPostById(@Args('userId') userId: string): Promise<Post> {
    return this.postsService.getPostById(userId);
  }
  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.createPost(createPostInput);
  }
}
