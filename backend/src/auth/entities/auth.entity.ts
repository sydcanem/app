import * as argon2 from 'argon2';
import { User } from '../../users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IAuth } from '../interfaces/auth.interface';

@Entity()
export class Auth implements IAuth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'refresh_token' })
  refreshToken: string;

  @Column({ default: false })
  blacklisted: boolean;

  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @ManyToOne((type) => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

  @Column({
    name: 'date_added',
    type: 'timestamp with time zone',
    default: 'now()',
  })
  dateAdded: Date;

  @BeforeInsert()
  async hashRefreshToken() {
    this.refreshToken = await argon2.hash(this.refreshToken);
  }
}
