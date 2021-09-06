import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { Auth } from './entities/auth.entity';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.stategy';
import { JwtRefreshTokenStrategy } from './jwt-refresh.strategy';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtConstants.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([Auth, User]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
