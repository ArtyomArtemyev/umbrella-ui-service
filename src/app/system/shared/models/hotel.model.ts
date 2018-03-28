import {DefaultTypeRoom} from './default-type-room.model';
import {ServicePrice} from './service-price.model';

export class Hotel {
  constructor(
    public name: string,
    public city: string,
    public address: string,
    public countOfStars: number,
    public description: string,
    public rooms: DefaultTypeRoom [],
    public photoName: string,
    public servicesPrice?: ServicePrice[],
    public id?: string,
    public isShownAddInformation?: boolean,
    public isShownRooms?: boolean,
    public photo?: String[],
    public isRoomButtonDisabled?: boolean,
    public isDeleteHotelButtonDisabled?: boolean,
    public isEditHotelButtonDisabled?: boolean
  ) {}
}
