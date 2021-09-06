import { IUser } from 'src/users/dto/user.interface';

export interface IAuth {
  id?: string;
  refreshToken: string;
  userId: string;
  blacklisted: boolean;
  user?: IUser;
}
