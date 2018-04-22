import {Ticket} from './ticket.model';

export class Voyage {

  constructor(
    public typeOfTransport: string,
    public fromWhence: string,
    public whereTo: string,
    public time: string,
    public company: string,
    public typeOfTickets: Ticket [],
    public isShowSuggestion: boolean,
    public id?: string
  ) {
  }
}
