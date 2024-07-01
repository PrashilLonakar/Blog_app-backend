import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async userLogin(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    console.log('loginUserDto', loginUserDto);

    const { token, user } = await this.userService.login(loginUserDto);
    res.cookie('isAuthenticated', true, { maxAge: 2 * 60 * 60 * 1000 }); //max age 2 hours
    res.cookie('authentication', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    });

    return res.send({ success: true, user });
  }
}
