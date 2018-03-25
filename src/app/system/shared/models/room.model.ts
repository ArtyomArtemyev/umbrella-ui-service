export class Room {
  constructor(
    public countOfBed: number,
    public typeOfBed: number,
    public countOfChildBed: number,
    public priceForChildBed: number,
    public price: number,
    public hotelId?: string,
    public id?: string
  ) {}
}
