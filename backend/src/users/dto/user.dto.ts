import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IUser } from './user.interface';

export class CreateUserDto implements IUser {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  readonly username: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
