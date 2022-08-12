import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './create-user-input';
import { User } from './user.schema';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Query(() => User)
  getUserById(@Args('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
}
