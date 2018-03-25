import {Room} from './room.model';

export class Hotel {
  constructor(
    public name: string,
    public city: string,
    public address: string,
    public countOfStars: number,
    public description: string,
    public rooms: Room [],
    public photoName: string,
    public id?: string,
    public isShownAddInformation?: boolean,
    public isShownRooms?: boolean,
    public photo?: String[],
    public isRoomButtonDisabled?: boolean,
    public isDeleteHotelButtonDisabled?: boolean
  ) {}
}
