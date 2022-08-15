/* eslint-disable prettier/prettier */

import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt-strategy') {
  //import jwt strategy logic by key

  getRequest(context: ExecutionContext) {
    console.log('Guard');
    const ctx = GqlExecutionContext.create(context);
    console.log('Create context');
    console.log(ctx.getContext().req.header.authorization);
    return ctx.getContext().req;
  }
}
