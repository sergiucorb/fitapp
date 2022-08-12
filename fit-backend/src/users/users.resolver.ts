import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterUserInput } from '../auth/dto/register-user-input';
import { User } from '../auth/user.schema';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}
}
