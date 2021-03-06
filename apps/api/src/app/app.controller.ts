import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Message } from '@ng-nest-perimeter-example/api-interfaces';
import { AppService } from './app.service';
import { Scopes, ScopesGuard } from './auth/scopes.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('read')
  getRead(): Message {
    return { message: 'read is unprotected' };
  }

  @UseGuards(AuthGuard('jwt'), ScopesGuard)
  @Scopes('read:1')
  @Get('read-1')
  getRead1(): Message {
    return { message: 'read-1 is protected with read:1 scope' };
  }

  @UseGuards(AuthGuard('jwt'), ScopesGuard)
  @Scopes('read:2')
  @Get('read-2')  
  getRead2(): Message {
    return { message: 'read-2 is protected with read:2 scope' };
  }
}
