import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RegisterUserInput } from './dto/register-user-input';
import { User, UserDocument } from './user.schema';
import { LoginUserInput } from './dto/login-user-input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login-response';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async getUsers(): Promise<User[]> {
    console.log('SERVICES');
    return this.userModel.find().exec();
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    return user;
  }

  async register(userInput: RegisterUserInput): Promise<User> {
    const user = await this.userModel.findOne({
      email: userInput.email,
    });
    if (user) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }
    const createUser = new this.userModel();
    createUser._id = new Types.ObjectId();
    createUser.name = userInput.name;
    createUser.email = userInput.email;
    createUser.password = await bcrypt.hash(userInput.password, 12);
    createUser.role = userInput.role;
    return await createUser.save();
  }

  async login(userInput: LoginUserInput): Promise<any> {
    const user = await this.userModel.findOne({
      email: userInput.email,
    });
    if (!userInput.password) {
      throw new Error('Signup process not finished');
    }
    if (!(await bcrypt.compare(userInput.password, user.password))) {
      throw new Error('Invalid password');
    }
    if (!user) {
      throw new HttpException(
        'Email or password are incorrect!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = { id: user._id, name: user.name, email: user.email };
    const access_token = this.jwtService.sign(payload);
    return { user, access_token } as LoginResponse;
  }
}
