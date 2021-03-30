import * as argon2 from 'argon2';
import { User } from '../../users/entities/user.entity';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { IAuth } from "../interfaces/auth.interface";

@Entity()
export class Auth implements IAuth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  refreshToken: string;

  @Column({ default: false })
  blacklisted: boolean;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(type => User)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;

  @Column({
    type: 'time with time zone',
    default: 'now()',
  })
  dateAdded: string;

  @BeforeInsert()
  async hashRefreshToken() {
    this.refreshToken = await argon2.hash(this.refreshToken);
  }
}
