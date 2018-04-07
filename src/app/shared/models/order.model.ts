import {Hotel} from '../../system/shared/models/hotel.model';
import {OrderSuggestion} from '../../system-user/shared/models/order-suggestion.model';
import {Token} from './token.model';
import {User} from './user.model';

export class Order {
  constructor(
    public hotel: Hotel,
    public city: string,
    public startDate: Date,
    public endDate: Date,
    public countOfMan: number,
    public orderSuggestion: OrderSuggestion,
    public status: string,
    public token?: Token,
    public id?: number,
    public user?: User,
    public isShownAdditionalInformation?: boolean
  ) {
  }
}
