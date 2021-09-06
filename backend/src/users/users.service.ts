import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(
      this.usersRepository.create({
        username: createUserDto.username,
        password: createUserDto.password,
      }),
    );
  }

  async findOne(id: string): Promise<User> {
    if (!id) {
      throw new UnauthorizedException();
    }

    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password'],
    });
  }
}
