import {Token} from './token.model';
import {User} from './user.model';

export class UpdateUser {
  constructor(
    public user: User,
    public token: Token
  ) {
  }
}
