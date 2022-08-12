import { Injectable, NotFoundException } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePostInput } from './create-post-input';
import { Post, PostDocument } from './post.schema';
import mongoose from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}
  getPosts(): Promise<Post[]> {
    return this.postModel.find().exec();
  }
  async getPostById(postId: string): Promise<Post> {
    const post = await this.postModel.findOne({ _id: postId });
    if (!post) {
      throw new NotFoundException(`Post by id ${postId} was not found`);
    }
    return post;
  }
  async createPost(createPostInput: CreatePostInput): Promise<Post> {
    const createPost = new this.postModel();
    createPost._id = new Types.ObjectId();
    createPost.title = createPostInput.title;
    createPost.description = createPostInput.description;
    createPost.type = createPostInput.type;
    createPost.active = createPostInput.active;

    createPost.user = createPostInput.user;
    // createPost.user = '';
    return await createPost.save();
  }
}
