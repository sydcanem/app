import * as argon2 from 'argon2';

import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../dto/user.interface';

/**
 * User entity for cart owners
 *
 * Extend as necessary
 */
@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
