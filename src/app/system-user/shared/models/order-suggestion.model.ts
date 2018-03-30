import {Hotel} from '../../../system/shared/models/hotel.model';
import {DefaultTypeRoom} from '../../../system/shared/models/default-type-room.model';
import {ServicePrice} from '../../../system/shared/models/service-price.model';

export class OrderSuggestion {
  constructor(
    public hotel: Hotel,
    public typeRoom: DefaultTypeRoom,
    public priceForRoom: number,
    public priceForDay: number,
    public fullPrice: number,
    public countRoom: number,
    public servicesPrices: ServicePrice [],
    public isShow?: boolean
  ) {}
}
