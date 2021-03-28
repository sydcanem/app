import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { IUser } from 'src/users/dto/user.interface';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    try {
      if (user && (await argon2.verify(user.password, password))) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  async login(user: IUser) {
    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      maxAge: jwtConstants.expiresIn
    };
  }
}
