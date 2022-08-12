import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserInput } from './create-user-input';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    return user;
  }

  async create(userInput: CreateUserInput): Promise<User> {
    const createUser = new this.userModel();
    createUser._id = new Types.ObjectId();
    createUser.name = userInput.name;
    createUser.email = userInput.email;
    createUser.password = userInput.password;
    createUser.role = userInput.role;

    return await createUser.save();
  }
}
