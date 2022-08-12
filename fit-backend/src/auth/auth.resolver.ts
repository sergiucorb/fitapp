import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/auth/user.schema';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user-input';
import { RegisterUserInput } from './dto/register-user-input';
import { GqlAuthGuard } from './gql-auth-guard';

@Resolver()
export class AuthResolver {
  constructor(private usersService: AuthService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  getUserById(@Args('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Mutation(() => User)
  register(@Args('registerInput') registerUserInput: RegisterUserInput) {
    return this.usersService.register(registerUserInput);
  }

  @Mutation(() => LoginResponse)
  login(@Args('loginInput') loginUserInput: LoginUserInput) {
    return this.usersService.login(loginUserInput);
  }
}
