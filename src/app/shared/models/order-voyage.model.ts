import {User} from './user.model';
import {Ticket} from './ticket.model';
import {Voyage} from './voyage.model';
import {Token} from './token.model';

export class OrderVoyage {

  constructor(
    public user: User,
    public ticket: Ticket,
    public voyage: Voyage,
    public date: Date,
    public fromWhence: string,
    public whereToInput: string,
    public countOfTicket: number,
    public token?: Token,
    public id?: string,
    public isShow?: boolean,
    public status?: string
  ) {
  }
}
