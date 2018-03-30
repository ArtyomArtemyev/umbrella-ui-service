import {Hotel} from '../../../system/shared/models/hotel.model';
import {OrderSuggestion} from './order-suggestion.model';

export class HotelSuggestion {
  constructor(
    public hotel: Hotel,
    public orderSuggestions: OrderSuggestion [],
    public isShowSuggestion?: boolean
  ) {}
}
