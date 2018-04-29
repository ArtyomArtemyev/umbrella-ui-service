import {User} from './user.model';
import {Hotel} from '../../system/shared/models/hotel.model';
import {Token} from './token.model';

export class Review {
  constructor(
    public user: User,
    public hotel: Hotel,
    public review: string,
    public date: Date,
    public token?: Token,
    public id?: string
  ) {
  }
}
