export class ServicePrice {
  constructor(
    public service: string,
    public price: number,
    public isRoom?: boolean,
    public id?: string
  ) {}
}
