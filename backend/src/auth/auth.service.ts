import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { IUser } from 'src/users/dto/user.interface';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Auth } from './entities/auth.entity';
import { IAuth } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
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

  generateToken(user: IUser) {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  generateRefreshToken(user: IUser) {
    const payload = { id: user.id };
    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConstants.refreshSecret,
      expiresIn: jwtConstants.refreshMaxAge,
    });
    return refreshToken;
  }

  async saveRefreshTokenForUser(user: IUser, refreshToken: string) {
    const auth: IAuth = this.authRepository.create({
      refreshToken,
      userId: user.id,
      blacklisted: false,
    });
    return await this.authRepository.save(auth);
  }

  async returnUserIfRefreshTokenMatch(user: IUser, refreshToken: string) {
    const auth: IAuth = await this.authRepository.findOne({
      where: { userId: user.id, blacklisted: false },
      order: { dateAdded: 'DESC' },
      relations: ['user'],
    });

    try {
      if (!auth.blacklisted && (await argon2.verify(auth.refreshToken, refreshToken))) {
        return auth.user;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  }
}
