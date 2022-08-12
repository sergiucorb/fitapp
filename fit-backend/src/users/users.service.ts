import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from '../auth/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RegisterUserInput } from '../auth/dto/register-user-input';

@Injectable()
export class UsersService {}
